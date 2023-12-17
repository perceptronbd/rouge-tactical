const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Vendor = require("./vendorModel");
const User = require("./userModel");

const purchaseSchema = new Schema({
  _id: {
    type: Schema.Types.ObjectId,
    auto: true,
    required: true,
  },
  orderNumber: {
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
      quantity: {
        type: String,
        required: true,
      },
      unitCost: {
        type: String,
        required: true,
      },
      subTotal: {
        type: String,
        required: true,
      },
    },
  ],
  remainingAmount: {
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
  date: {
    type: Date,
    default: Date.now,
  },
  deliveredItems: {
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

const PurchaseOrder = mongoose.model("PurchaseOrder", purchaseSchema);

module.exports = PurchaseOrder;
