const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Vendor = require("./vendorModel");
const User = require("./userModel");

const purchaseSchema = new Schema({
  orderNumber: {
    type: String,
    required: true,
    unique: true,
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
  },
  vendor: {
    type: Schema.Types.ObjectId,
    ref: Vendor,
    required: true,
  },
  substituteVendor: {
    type: Schema.Types.ObjectId,
    ref: Vendor,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  deliveredItems: {
    type: String,
  },
  status: {
    type: Boolean,
    required: true,
  },
  createdBy: {
    userId: {
      type: Schema.Types.ObjectId,
      ref: User,
    },
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const PurchaseOrder = mongoose.model("Purchase", purchaseSchema);

module.exports = PurchaseOrder;
