const mongoose = require("mongoose");

// Create a schema for the deleted employee data
const deletedEmployeeSchema = new mongoose.Schema(
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
    },
    Role: {
      type: String,
    },
    DesignationId: {
      type: String,
    },
    Profile: {
      type: String,
    },
    Gender: {
      type: String,
      required: true,
    },
    deletedAt: {
      type: Date,
      default: Date.now, // Store the deletion timestamp
    },
  },
  {
    timestamps: true,
  }
);

const DeletedEmployeeModel = mongoose.model("DeletedEmployee", deletedEmployeeSchema);

module.exports = DeletedEmployeeModel;
