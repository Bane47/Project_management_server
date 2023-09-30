const express = require("express");
const router = express.Router();
const EmployeeModel = require("../model/EmployeeModel");
const DeletedEmployeeModel = require('../model/DeletedEmployeeModel');
const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Define the function to generate a random password
function generateRandomPassword() {
  const length = 8; // You can adjust the length of the password
  const charset = "abcdeABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let password = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    password += charset.charAt(randomIndex);
  }
  return password;
}

// Create a Nodemailer transporter with your Gmail account
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "karthiynot2108@gmail.com", // Your Gmail address
    pass: "ihnsbfwigpcqfcrv", // Your Gmail password
  },
});

// Route to add a new employee
router.post("/add-employee", async (req, res) => {
  try {
    const { Email, Gender } = req.body;

    const existingUser = await EmployeeModel.find({ Email: Email }).select(
      "Email"
    );
    console.log("email", Email);
    console.log("existingUser", existingUser.length);

    if (existingUser.length) {
      return res.status(500).json({ message: "User already exist" });
    }
    // Generate a random password for the new employee
    const password = generateRandomPassword();

    // Bcrypt hash of the password
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
});



//edit employee route

router.put("/updateEmployee/:id", async (req, res) => {
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

    return res.json({ message: "Employee data updated successfully", employee: updatedDoc });
  } catch (err) {
    console.error("Error updating employee data:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
});


// Controller to delete an employee
router.post("/deleteEmployee", async (req, res) => {
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
});


module.exports = router;
