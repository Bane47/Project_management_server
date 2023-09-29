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
    default: "null",
  },
  UnitHeadEmail:{
    type:String
  }
});

module.exports = mongoose.model("AssignedTask", assignedTaskSchema);
