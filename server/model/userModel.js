const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const Schema = mongoose.Schema;

// Define the schema for your MongoDB model
const userSchema = new Schema({
  _id: {
    type: Schema.Types.ObjectId,
    auto: true,
    required: true,
  },
  name: {
    type: String,
    maxlength: 225,
    required: true,
  },

  password: {
    type: String,
    required: [true, "Please add a password"],
    minLength: [6, "Password must be up to 6 characters"],
    //   maxLength: [23, "Password must not be more than 23 characters"],
  },

  phone: {
    type: String,
    required: true,
  },
  personalEmail: {
    type: String,
    required: [true, "Please add a email"],
    unique: true,
    trim: true,
  },
  workEmail: {
    type: String,
    unique: true,
    trim: true,
  },
  preferredEmail: {
    type: String,
    required: [true, "Please add a email"],
    unique: true,
    trim: true,
  },
  DOB: {
    type: Date,
    required: true,
  },
  position: {
    type: String,
  },
  role: {
    type: String,
    enum: ["admin", "employee"],
    required: true,
  },
  emergencyContact: {
    name: {
      type: String,
      maxlength: 30,
    },
    phone: String,
  },
  address: {
    type: String,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Create the MongoDB model using the schema
const User = mongoose.model("User", userSchema);

module.exports = User;
