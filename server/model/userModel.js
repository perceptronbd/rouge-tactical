const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const Schema = mongoose.Schema;

// Define the schema for your MongoDB model
const userSchema = new Schema({
  name: {
    type: String,
    maxlength: 30,
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
  email: {
    type: String,
    required: [true, "Please add a email"],
    unique: true,
    trim: true,
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Please enter a valid email",
    ],
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

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  try {
    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(this.password, salt);
    this.password = hashedPassword;
    next();
  } catch (error) {
    return next(error); // Pass any errors to the next middleware or route handler
  }
});

// Create the MongoDB model using the schema
const User = mongoose.model("User", userSchema);

module.exports = User;
