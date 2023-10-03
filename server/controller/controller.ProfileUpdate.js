const EmployeeModel = require('../model/EmployeeModel')

const handleProfileUpdate = async (req, res) => {
  const { email } = req.query;
  const newProfileImageFilename = req.file.filename;

  try {
    // Find the employee by email
    const employee = await EmployeeModel.findOne({ Email: email });

    if (!employee) {
      return res.status(404).send("Employee not found");
    }

    // Update the 'Profile' field with the new image filename
    employee.Profile = newProfileImageFilename;
    
    // Save the updated employee document
    await employee.save();

    res.status(200).send("Profile image updated successfully");
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).send("Internal server error");
  }
};

module.exports = { handleProfileUpdate };
