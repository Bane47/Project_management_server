const mongoose = require('mongoose');


const taskSchema = new mongoose.Schema({
  projectName: {
    type: String,
    trim: true,
  },
  taskName: {
    type: String,
    required: true,
    trim: true,
  },
  taskDescription: {
    type: String,
    required: true,
    trim: true,
  },
  dueDate: {
    type: Date,
    required: true,
  },
  TeamLeadEmail: {
    type: String,
    trim: true,
  },
  employeeName: {
    type: String,
    trim: true,
  },
  employeeEmail: {
    type: String,
    trim: true,
  },
  status:{
    type:String,
    default:"Assigned"
  },
  deleted: {
    type: Boolean,
    default: false, 
  },
});

// Create the Task model
const TaskModel = mongoose.model('Tasks', taskSchema);

module.exports = TaskModel;
