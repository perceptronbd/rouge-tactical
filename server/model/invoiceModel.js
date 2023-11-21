const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Vendor = require("./vendorModel");

const invoiceSchema = new Schema({
  date: {
    type: Date,
    required: true,
  },
  invoiceNumber: {
    type: String,
    required: true,
    unique: true,
  },
  vendor: {
    type: Schema.Types.ObjectId,
    ref: Vendor,
    required: true,
  },
  vendorName: {
    type: String,
    required: true,
  },
  items: [
    {
      item: {
        type: String,
        required: true,
      },
      cost: {
        type: String,
        required: true,
      },
      quantity: {
        type: String,
        required: true,
      },
    },
  ],
  totalAmount: {
    type: String,
    required: true,
  },
  depositAmount: {
    type: String,
    required: true,
  },
  delivered: {
    type: String,
  },
  status: {
    type: String,
    enum: ["open", "close"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const Invoice = mongoose.model("Invoice", invoiceSchema);

module.exports = Invoice;
