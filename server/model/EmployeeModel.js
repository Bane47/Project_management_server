const mongoose = require("mongoose");

// Regular expression pattern for a valid email address
const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

// Create a schema for the employee data
const employeeSchema = new mongoose.Schema(
  {
    EmployeeName: {
      type: String,
      required: true,
    },
    EmployeeId: {
      type: String,
      required: true,
    },
    Email: {
      type: String,
      required: true,
      unique: true,
      match: emailRegex,
    },
    Designation: {
      type: String,
      required: true,
    },
    SpecializedRole: {
      type: String,
    },
    Domain1: {
      type: String,
    },
    Domain2: {
      type: String,
    },
    OtherDomains: {
      type: String,
    },
    SkypeId: {
      type: String,
      unique: true,
    },
    Password: {
      type: String,
      required: true,
    },
    Role: {
      type: String,
      default: "Employee",
    },
    lastLoginTime: {
      type: Date,
    },
    isLoggedIn: {
      type: Boolean,
      default: false,
    },
    DesignationId: {
      type: String, // Store DesignationId as a string
    },
    Profile: {
      type: String,
    },
    Gender: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Create a Mongoose model for the employee schema
const EmployeeModel = mongoose.model("Employee", employeeSchema);

module.exports = EmployeeModel;
