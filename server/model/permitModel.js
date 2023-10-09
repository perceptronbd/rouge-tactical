const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Vendor = require("./vendorModel");

const User = require("./userModel");

const permitSchema = new mongoose.Schema({
    permit: {
      type: String,
      required: true,
    },
    form: {
      type: String,
      required: true,
    },
    renewalProcess: {
      type: String,
      required: true,
    },

    renewalDuration: {
      type: Number,
      required: true,
    },
    renewalDeadline: {
      type: Date,
      required: true,
    },
    contactInfo: {
      type: String,
      required: true,
    },
    notes: {
      type: String,
      required: true,
    },
    notifyAdmin: {
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: User, 
        required: true,
      },
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  });
  
  const permit = mongoose.model("permit", permitSchema);

  module.exports = permit;
  

