const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const User = require("./userModel");






const maintenanceSchema = new mongoose.Schema({
    machine: {
        type: String,
        required: true
    },
    condition: {
        type: String,
        enum: ["good", "fair", "poor", "bad"],
        required: true
    },
    location: {
        type: String
    },
    assignedTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: User // Reference to the User model
    },
    lastMaintenanceDate: {
        type: Date
    },
    maintenanceInterval: {
        type: Number,
        required: true
    },
    nextMaintenanceDate: {
        type: Date
    },
    notes: {
        type: String
    },
    status: {
        type: String,
        enum: ["in progress", "complete"],
        required: true
    }
});

const Maintenance = mongoose.model("Maintenance", maintenanceSchema);

module.exports = Maintenance;