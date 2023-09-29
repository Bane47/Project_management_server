const express = require("express");
const TaskModel = require("../model/TaskModel");
const router = express.Router();
const nodemailer = require("nodemailer");

/// Nodemailer transporter setup
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "karthiynot2108@gmail.com", // Your Gmail address
    pass: "ihnsbfwigpcqfcrv", // Your Gmail password
  },
});

// Route to handle POST requests to add a task
router.post("/add-task", async (req, res) => {
  try {
    // Extract task data from the request body
    const {
      projectName,
      taskName,
      taskDescription,
      dueDate,
      TeamLeadEmail,
      employeeName,
      employeeEmail,
    } = req.body;

    // Create a new Task model instance with the provided data
    const newTask = new TaskModel({
      projectName,
      taskName,
      taskDescription,
      dueDate,
      TeamLeadEmail,
      employeeName,
      employeeEmail,
    });

    // Save the new task to the database
    await newTask.save();

    // Send an email to the employee using Nodemailer
    const mailOptions = {
      from: TeamLeadEmail, // Use the TeamLeadEmail as the sender
      to: employeeEmail, // Employee's email address
      subject: "Task Assignment",
      text: `Hello ${employeeName},\n\nYou have been assigned a new task:\nTask Name: ${taskName}\nDescription: ${taskDescription}\nDue Date: ${dueDate}\n\nBest regards,\nTeam Lead`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending email:", error);
        res.status(500).json({ error: "Error sending email" });
      } else {
        console.log("Email sent:", info.response);
        res.status(201).json({ message: "Task added successfully" });
      }
    });
  } catch (error) {
    console.error("Error adding task:", error);
    res.status(500).json({ error: "Error adding task" });
  }
});

router.get("/get-task-status", async (req, res) => {
  try {
    const { TeamLeadEmail } = req.query;
    const taskData = await TaskModel.find({ TeamLeadEmail: TeamLeadEmail });
    res.status(200).json({ taskData }); // Sending the taskData as JSON response
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.delete("/delete-task/:taskId", async (req, res) => {
  try {
    const taskId = req.params.taskId;

    const updatedTask = await TaskModel.findByIdAndUpdate(
      taskId,
      { $set: { deleted: true } },  
      { new: true }
    );

    if (!updatedTask) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json({ message: "Task marked as deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

//this is for the Tasks.js from employeeend

router.get("/getTask-Data", async (req, res) => {
  try {
    const { userEmail } = req.query;
    const taskData = await TaskModel.find({ employeeEmail: userEmail });
    res.status(200).json({ taskData }); // Sending the taskData as JSON response
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

//this is for status update

router.put("/updateTaskStatus/:taskId", async (req, res) => {
  try {
    const { taskId } = req.params;
    const { status } = req.body;

    // Assuming your Mongoose model is named TaskModel
    const updatedTask = await TaskModel.findByIdAndUpdate(
      taskId,
      { status },
      { new: true }
    );

    if (!updatedTask) {
      return res.status(404).json({ error: "Task not found" });
    }

    return res.status(200).json(updatedTask);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
});
module.exports = router;
