const express = require("express");
const router = express.Router();

const { handleAddProject, handleGetProjectData } = require("../controller/controller.AddProject");

// POST route to save project data to the database
router.post("/add-project", handleAddProject);

router.get("/get-project-data",handleGetProjectData);

module.exports = router;
