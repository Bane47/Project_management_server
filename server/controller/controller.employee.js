const EmployeeModel = require("../model/EmployeeModel");
const DeletedEmployeeModel = require("../model/DeletedEmployeeModel");
const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// to generate a random password
function generateRandomPassword() {
  const length = 8; 
  const charset = "abcdeABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let password = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    password += charset.charAt(randomIndex);
  }
  return password;
}  //this will return an random 8 digit function

//  Nodemailer transporter 
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "karthiynot2108@gmail.com",
    pass: "ihnsbfwigpcqfcrv",
  },
});

const handleAddEmployee = async (req, res) => {
  try {
    const { Email, Gender, EmployeeId } = req.body;

    const existingUser = await EmployeeModel.find({ Email: Email }).select(
      "Email"
    );

    if (existingUser.length) {
      return res.status(500).json({ message: "Email Already Registered" });
    }

    // Checkecking employee ID already exists
    const existingEmployeeIdUser = await EmployeeModel.find({
      EmployeeId: EmployeeId,
    }).select("EmployeeId");

    if (existingEmployeeIdUser.length) {
      return res.status(500).json({ message: "Try Another Employee Pin" });
    }

    // random password for nem employee
    const password = generateRandomPassword();

    // hash of the password
    const hashedPassword = await bcrypt.hash(password, 10);

    const profile = Gender.toLowerCase() === "male" ? "male.png" : "female.png";

    // Create a new employee document using the EmployeeModel
    const newEmployee = new EmployeeModel({
      ...req.body,
      Password: hashedPassword, // Store the hashed password
      Profile: profile,
    });

    // Save the new employee to the database
    await newEmployee.save();

    const user = await EmployeeModel.findOne({ Email: Email });

    const id = user._id;

    const token = jwt.sign({ id: id }, "jwt_secret_key", {
      expiresIn: "1d",
    });

    // Send an email with the actual generated password
    const mailOptions = {
      from: "karthiynot2108@gmail.com", // Your Gmail address
      to: req.body.Email, // Employee's email from the request
      subject: "Your New Employee Password",
      text: `Hello,\n\nYour new password is: ${password}\n\nPlease keep it secure. If you wish, you can change the password use the below link\nhttp://localhost:3000/reset_password/${id}/${token}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending email:", error);
        res.status(500).json({ error: "Internal server error" });
      } else {
        console.log("Email sent: " + info.response);
        res.status(201).json({ message: "Employee added successfully" });
      }
    });
  } catch (error) {
    console.error("Error adding employee:", error);
    res.status(500).json({ error: `Internal server error ${error.message}` });
  }
};

const handleEditEmployee = async (req, res) => {
  const employeeId = parseInt(req.params.id);
  const updatedEmployee = req.body;

  try {
    const updatedDoc = await EmployeeModel.findOneAndUpdate(
      { EmployeeId: employeeId },
      updatedEmployee,
      { new: true }
    );

    if (!updatedDoc) {
      return res.status(404).json({ error: "Employee not found" });
    }

    return res.json({
      message: "Employee data updated successfully",
      employee: updatedDoc,
    });
  } catch (err) {
    console.error("Error updating employee data:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const handleDeleteEmployee = async (req, res) => {
  try {
    const { employee } = req.body;

    // Generate a new unique _id for the DeletedEmployeeModel
    const newDeletedEmployee = new DeletedEmployeeModel(employee);

    // Remove the _id field from the employee data to let MongoDB generate a new unique _id
    const { _id, ...employeeDataWithoutId } = employee;

    // Create a new instance of DeletedEmployeeModel using the employee data without _id
    const deletedEmployee = new DeletedEmployeeModel(employeeDataWithoutId);

    // Save the deleted employee to the DeletedEmployeeModel
    await deletedEmployee.save();

    // Delete the employee from the Employees collection using the _id
    await EmployeeModel.findByIdAndRemove(_id);

    res.status(200).json({ message: "Employee deleted successfully" });
  } catch (error) {
    console.error("Error deleting employee:", error);
    res.status(500).json({ error: "Failed to delete employee" });
  }
};

module.exports = {
  handleAddEmployee,
  handleEditEmployee,
  handleDeleteEmployee,
};
