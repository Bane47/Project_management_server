const AddProjectModel = require("../model/AddProjectModel");



const handleAddProject=async (req, res) => {
    try {
      console.log("came inside");
      const projectData = req.body;
  
      const newProject = new AddProjectModel(projectData);
  
      await newProject.save(); // Save the project data to the database
  
      res.status(201).json({ message: "Project saved successfully" });
    } catch (error) {
      console.error("Error saving project:", error);
      res.status(500).json({ message: "Server error while saving project" });
    }
  }

  const handleGetProjectData=async (req, res) => {
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
  }

  module.exports={handleAddProject,handleGetProjectData}