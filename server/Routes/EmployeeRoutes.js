const express = require("express");
const router = express.Router();
const {
  handleAddEmployee,
  handleEditEmployee,
  handleDeleteEmployee,
} = require("../controller/controller.employee");

// Route to add a new employee
router.post("/add-employee", handleAddEmployee);

//edit employee route

router.put("/updateEmployee/:id", handleEditEmployee);

// Controller to delete an employee
router.post("/deleteEmployee", handleDeleteEmployee);

module.exports = router;
