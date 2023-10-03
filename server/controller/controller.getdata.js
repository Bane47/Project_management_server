
const EmployeeModel = require('../model/EmployeeModel');


const handleEmpData=async (req, res) => {
    try {
      const empData = await EmployeeModel.find();
      res.status(200).json(empData);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  }


  const handleGetDataOne= async (req, res) => {
    const { email } = req.query;
  
    try {
      // Find the user with the specified email
      const empData = await EmployeeModel.findOne({ Email: email });
  
      if (!empData) {
        return res.status(404).json({ error: "User not found" });
      }
  
      res.status(200).json(empData);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  }

  module.exports={handleEmpData,handleGetDataOne}