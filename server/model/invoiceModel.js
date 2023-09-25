const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Vendor = require("./vendorModel");

const invoiceSchema = new Schema({
  _id: {
    type: Schema.Types.ObjectId,
    auto: true,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  invoiceNumber: {
    type: String,
    required: true,
  },
  vendor: {
    type: Schema.Types.ObjectId,
    ref: Vendor,
    required: true,
  },
  item: {
    type: String,
    required: true,
  },
  quantity: {
    type: String,
    required: true,
  },
  totalAmount: {
    type: String,
    required: true,
  },
  depositAmount: {
    type: String,
    required: true,
  },
  delivered: {
    type: Boolean,
    default: true,
  },
  status: {
    type: Boolean,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Invoice = mongoose.model("Invoice", invoiceSchema);

module.exports = Invoice;
