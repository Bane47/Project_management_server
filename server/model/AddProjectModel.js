const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Common email regex pattern

const projectSchema = new Schema({
  projectTitle: {
    type: String,
    required: true,
    trim: true,
    minlength: 1,
    maxlength: 100,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  projectCategory: {
    type: String,
    enum: ['internal', 'ecommerce', 'personalized', 'others'],
    required: true,
  },
  projectDomain: { // Added Project Domain field
    type: String,
    enum: ['Dotnet', 'OpenSource'], // Specify the allowed values
    required: true,
  },
  projectDescription: { // Added Project Description field
    type: String,
    required: true,
  },
  teamLead: {
    type: String,
    required: true,
    trim: true,
    minlength: 1,
    maxlength: 100,
  },
  teamLeadEmail: {
    type: String,
    required: true,
    trim: true,
    validate: {
      validator: function (email) {
        return emailRegex.test(email);
      },
      message: 'Invalid email format',
    },
  },
  clientName: {
    type: String,
    required: true,
    trim: true,
    minlength: 1,
    maxlength: 100,
  },
  clientEmail: {
    type: String,
  },
  clientSkypeId: {
    type: String,
    trim: true,
    minlength: 1,
    maxlength: 100,
  },
  projectManagerEmail: {
    type: String,
    required: true,
    trim: true,
    validate: {
      validator: function (email) {
        return emailRegex.test(email);
      },
      message: 'Invalid email format',
    },
  },
  status:{
    type:String,
    default:"Assigned"
  }
});

const AddProjectModel = mongoose.model('Projects', projectSchema);

module.exports = AddProjectModel;
