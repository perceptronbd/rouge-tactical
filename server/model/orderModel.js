const mongoose = require("mongoose");



const Schema = mongoose.Schema;
// const Vendor = require("./vendorModel");
const orderSchema = new Schema({
  _id: {
    type: Schema.Types.ObjectId,
    auto: true,
    required: true,
  },
  item: {
    type: String,
    required: true,
  },
  size: {
    type: String,
    required: true,
  },
  quantity: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  totalAmount: {
    type: String,
    required: true,
  },
  depositAmount: {
    type: String,
    default: 0,
  },
  deliveredItems: {
    type: String,
  },
  vendor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Vendor",
    required: true,
  },
  substituteVendor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Vendor",
  },
  date: {
    type: Date,
    default: Date.now,
  },
  needed: {
    type: String,
    enum: ["ASAP", "Soon"],
    required: true,
  },
  approved: {
    type: Boolean,
    // required: true, [as employee wont send the data for this column except admin]
    default: false,
  },
  // status: {
  //   type: Boolean,
  //   required: true,
  // },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  purchaseOrdered: {
    type: Boolean,
    default: false,
    required: true, 
  },
  ordered: {
    type: Boolean,
    default: false,
  },
  requested: {
    type: Boolean,
    default: false,
  },
  approvedRequest: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
