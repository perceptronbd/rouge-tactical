const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const docSchema = new Schema({
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
    userId: { type: Schema.Types.ObjectId, ref: "User" },
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
