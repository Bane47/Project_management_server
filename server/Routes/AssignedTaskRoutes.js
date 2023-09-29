const express = require("express");
const router = express.Router();
const AssignedTaskModel = require("../model/AssignedTaskModel");
const nodemailer = require("nodemailer");
const AddProjectModel = require("../model/AddProjectModel");

// Define a route to handle the assignment of a project
router.post("/assignProject", async (req, res) => {
  try {
    const {
      projectTitle,
      projectDescription,
      projectManager,
      managerEmail,
      UnitHeadEmail,
    } = req.body;

    // Create a new AssignedTask document and save it to the database
    const newTask = new AssignedTaskModel({
      projectTitle,
      projectDescription,
      projectManager,
      managerEmail,
      UnitHeadEmail,
    });

    await newTask.save();

    // Create a Nodemailer transporter with your Gmail account
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "karthiynot2108@gmail.com", // Your Gmail address
        pass: "ihnsbfwigpcqfcrv", // Your Gmail password
      },
    });

    // Send an email to the project manager
    const mailOptions = {
      from: "karthiynot2108@gmail.com", // Your Gmail address
      to: managerEmail,
      subject: "New Project Assignment",
      text: `You have been assigned a new project. Project Description: ${projectDescription}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
      } else {
        console.log("Email sent: " + info.response);
        res
          .status(201)
          .json({ message: "Project assigned successfully and email sent!" });
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

//getting the assigned tasks

router.get("/get-assignedtasks", async (req, res) => {
  try {
    const { userEmail } = req.query;

    const TaskData = await AssignedTaskModel.find({ UnitHeadEmail: userEmail });

    res.status(200).json(TaskData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

//this route is for the PM
router.get("/get-assignedtasks-pm", async (req, res) => {
  try {
    const { userEmail } = req.query;

    const TaskData = await AssignedTaskModel.find({ managerEmail: userEmail });

    res.status(200).json(TaskData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.put('/update-task-status/:taskId', async (req, res) => {
  try {
    const { taskId } = req.params;
    const { status } = req.body;

    // Find the task by ID and update its status
    const updatedTask = await AssignedTaskModel.findByIdAndUpdate(taskId, { status }, { new: true });

    if (!updatedTask) {
      return res.status(404).json({ error: 'Task not found' });
    }

    return res.status(200).json(updatedTask);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});


//tl Report manager

//this route is for the tl
router.get("/get-assignedtasks-tl", async (req, res) => {
  try {
    const { userEmail } = req.query;

    const TaskData = await AddProjectModel.find({ teamLeadEmail: userEmail });

    res.status(200).json(TaskData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.put('/update-task-status-tl/:taskId', async (req, res) => {
  try {
    const { taskId } = req.params;
    const { status } = req.body;

    // Assuming your Mongoose model is named TaskModel
    const updatedTask = await AddProjectModel.findByIdAndUpdate(taskId, { status }, { new: true });

    if (!updatedTask) {
      return res.status(404).json({ error: 'Task not found' });
    }

    return res.status(200).json(updatedTask);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
