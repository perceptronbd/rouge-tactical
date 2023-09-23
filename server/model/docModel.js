const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const docSchema = new Schema({
  originalname: {
    type: String,
  },
  mimetype: {
    type: String,
  },
  size: {
    type: String,
  },
  uploadedBy: {
    userId: { type: Schema.Types.ObjectId, ref: "User" },
    name: String,
  },
  filePath: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Doc = mongoose.model("Doc", docSchema);

module.exports = Doc;
