const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const User = require("./userModel");

const maintenanceEmailSchema = new mongoose.Schema({
  _id: {
    type: Schema.Types.ObjectId,
    auto: true,
    required: true,
  },
  notifyAdmin: {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: User,
    },
  },
  userWorkEmail: {
    type: String,
  },
  machine: {
    type: String,
  },
  condition: {
    type: String,
  },
  location: {
    type: String,
  },
  assignedTo: {
    type: String,
  },
  status: {
    type: String,
    enum: ["in-progress", "not-started", "finished"],
  },
  notes: {
    type: String,
  },
  nextMaintenanceDate: {
    type: Date,
  },
  send: {
    type: Boolean,
  },

  priorDeadline: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const MaintenanceEmail = mongoose.model(
  "MaintenanceEmail",
  maintenanceEmailSchema
);

module.exports = MaintenanceEmail;
