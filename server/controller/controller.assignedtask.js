const AssignedTaskModel = require("../model/AssignedTaskModel");
const nodemailer = require("nodemailer");
const AddProjectModel = require("../model/AddProjectModel");

const handleAssignTask = async (req, res) => {
  try {
    const {
      projectTitle,
      projectDescription,
      projectManager,
      managerEmail,
      UnitHeadEmail,
      clientName, // Add clientName to the destructured object
      clientEmail, // Add clientEmail to the destructured object
      clientSkypeId, // Add clientSkypeId to the destructured object
    } = req.body;

    // Create a new AssignedTask document and save it to the database
    const newTask = new AssignedTaskModel({
      projectTitle,
      projectDescription,
      projectManager,
      managerEmail,
      UnitHeadEmail,
      clientName, // Save clientName in the database
      clientEmail, // Save clientEmail in the database
      clientSkypeId, // Save clientSkypeId in the database
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
      text: `
        You have been assigned a new project:
        - Project Title: ${projectTitle}
        - Project Description: ${projectDescription}
        - Client Name: ${clientName} // Include clientName
        - Client Email: ${clientEmail} // Include clientEmail
        - Client Skype ID: ${clientSkypeId} // Include clientSkypeId
      `,
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
};

module.exports = handleAssignTask;


//to display the task asi=signed by unithead to unithead
const handleUnitHeadAssigned = async (req, res) => {
  try {
    const { userEmail } = req.query;

    const TaskData = await AssignedTaskModel.find({ UnitHeadEmail: userEmail });

    res.status(200).json(TaskData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const handlePMTasks = async (req, res) => {
  try {
    const { userEmail } = req.query;

    const TaskData = await AssignedTaskModel.find({ managerEmail: userEmail });

    res.status(200).json(TaskData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const handleUpdateStatusPM = async (req, res) => {
  try {
    const { taskId } = req.params;
    const { status } = req.body;

    // Find the task by ID and update its status
    const updatedTask = await AssignedTaskModel.findByIdAndUpdate(
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

const handleTLTasks = async (req, res) => {
  try {
    const { userEmail } = req.query;

    const TaskData = await AddProjectModel.find({ teamLeadEmail: userEmail });

    res.status(200).json(TaskData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const handleUpdateStatusToPM = async (req, res) => {
  try {
    const { taskId } = req.params;
    const { status } = req.body;

    // Assuming your Mongoose model is named TaskModel
    const updatedTask = await AddProjectModel.findByIdAndUpdate(
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
  handleAssignTask,
  handleUnitHeadAssigned,
  handlePMTasks,
  handleUpdateStatusPM,
  handleTLTasks,
  handleUpdateStatusToPM,
};
