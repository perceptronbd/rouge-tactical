const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const User = require("./userModel");

const notifyAdminEmailSchema = new mongoose.Schema({
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

  renewalDeadline: {
    type: String,
  },
  send: {
    type: Boolean,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const NotifyAdminEmail = mongoose.model(
  "NotifyAdminEmail",
  notifyAdminEmailSchema
);

module.exports = NotifyAdminEmail;
