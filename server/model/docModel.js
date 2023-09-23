const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const User = require("./userModel");
const docSchema = new Schema({
  docId: {
    type: Schema.Types.ObjectId,
    default: mongoose.Types.ObjectId,
    index: true,
    unique: true,
  },
  originalname: {
    type: String,
    required: true,
  },
  mimetype: {
    type: String,
    required: true,
  },
  size: {
    type: String,
    required: true,
  },
  uploadedBy: {
    userId: { type: Schema.Types.ObjectId, ref: User },
    name: String,
    required: true,
  },
  filePath: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Doc = mongoose.model("Doc", docSchema);

module.exports = Doc;
