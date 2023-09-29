const express = require("express");
const EmployeeModel = require('../model/EmployeeModel');
const router = express.Router();

router.get("/getEmp-data", async (req, res) => {
  try {
    const empData = await EmployeeModel.find();
    res.status(200).json(empData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
