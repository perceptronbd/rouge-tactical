const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const PurchaseOrder = require("./purchaseModel");
const Invoice = require("./invoiceModel");
const Order = require("./orderModel");

const vendorSchema = new Schema({
  _id: {
    type: Schema.Types.ObjectId,
    auto: true,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  contact: {
    type: String,
    required: true,
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
      "Please enter a valid email address",
    ],
  },

  address: {
    type: String,
    required: true,
  },
  orders: [
    {
      type: Schema.Types.ObjectId,
      ref: Order,
    },
  ],
  purchaseOrders: [
    {
      type: Schema.Types.ObjectId,
      ref: PurchaseOrder,
    },
  ],
  invoices: [
    {
      type: Schema.Types.ObjectId,
      ref: Invoice,
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Vendor = mongoose.model("Vendor", vendorSchema);

module.exports = Vendor;
