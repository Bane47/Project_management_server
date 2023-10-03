const express = require("express");

const router = express.Router();

const {
  handleAddTask,
  handleTaskStatus,
  handleDeleteTask,
  handleTaskData,
  handleUpdateTaskStatus,
} = require("../controller/controller.AddTask");

// Route to handle POST requests to add a task
router.post("/add-task", handleAddTask);

router.get("/get-task-status", handleTaskStatus);

router.delete("/delete-task/:taskId", handleDeleteTask);

//this is for the Tasks.js from employeeend

router.get("/getTask-Data", handleTaskData);

//this is for status update

router.put("/updateTaskStatus/:taskId", handleUpdateTaskStatus);
module.exports = router;
