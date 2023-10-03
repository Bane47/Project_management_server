const mongoose = require("mongoose");

const assignedTaskSchema = new mongoose.Schema({
  projectTitle: {
    type: String,
    required: true,
  },
  projectDescription: {
    type: String,
    required: true,
  },
  projectManager: {
    type: String,
    required: true,
  },
  managerEmail: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    default: "Assigned",
  },
  UnitHeadEmail: {
    type: String,
  },
  clientName: {
    type: String,
    required: true,
  },
  clientEmail: {
    type: String,
    required: true,
  },
  clientSkypeId: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("AssignedTask", assignedTaskSchema);
