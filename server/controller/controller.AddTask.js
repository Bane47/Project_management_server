const nodemailer = require("nodemailer");
const TaskModel = require("../model/TaskModel");

/// Nodemailer transporter setup
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "karthiynot2108@gmail.com", // Your Gmail address
    pass: "ihnsbfwigpcqfcrv", // Your Gmail password
  },
});

const handleAddTask = async (req, res) => {
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
};

const handleTaskStatus = async (req, res) => {
  try {
    const { TeamLeadEmail } = req.query;
    const taskData = await TaskModel.find({ TeamLeadEmail: TeamLeadEmail });
    res.status(200).json({ taskData }); // Sending the taskData as JSON response
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const handleDeleteTask = async (req, res) => {
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
};

const handleTaskData = async (req, res) => {
  try {
    const { userEmail } = req.query;
    const taskData = await TaskModel.find({ employeeEmail: userEmail });
    res.status(200).json({ taskData }); // Sending the taskData as JSON response
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const handleUpdateTaskStatus = async (req, res) => {
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
};

module.exports = {
  handleAddTask,
  handleTaskStatus,
  handleDeleteTask,
  handleTaskData,
  handleUpdateTaskStatus,
};
