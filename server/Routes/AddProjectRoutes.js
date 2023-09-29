const express = require("express");
const router = express.Router();
const AddProjectModel = require("../model/AddProjectModel");

// POST route to save project data to the database
router.post("/add-project", async (req, res) => {
  try {
    const projectData = req.body;

    const newProject = new AddProjectModel(projectData);

    await newProject.save(); // Save the project data to the database

    res.status(201).json({ message: "Project saved successfully" });
  } catch (error) {
    console.error("Error saving project:", error);
    res.status(500).json({ message: "Server error while saving project" });
  }
});

router.get("/get-project-data", async (req, res) => {
  try {
    const { userEmail } = req.query;

    const projectData = await AddProjectModel.find({
      projectManagerEmail: userEmail,
    });
    res.status(200).json(projectData);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
