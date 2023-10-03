const express = require("express");
const router = express.Router();

const {
  handleAssignTask,
  handleUnitHeadAssigned,
  handlePMTasks,
  handleUpdateStatusPM,
  handleTLTasks,
  handleUpdateStatusToPM,
} = require("../controller/controller.assignedtask");

// Define a route to handle the assignment of a project
router.post("/assignProject", handleAssignTask);

//getting the assigned tasks

router.get("/get-assignedtasks", handleUnitHeadAssigned);

//this route is for the PM
router.get("/get-assignedtasks-pm", handlePMTasks);

router.put("/update-task-status/:taskId", handleUpdateStatusPM);

//tl Report manager

//this route is for the tl
router.get("/get-assignedtasks-tl", handleTLTasks);


//this is route to update the status to PM by TL
router.put("/update-task-status-tl/:taskId", handleUpdateStatusToPM);

module.exports = router;
