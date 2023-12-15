const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const orderEmailSchema = new Schema({
  _id: {
    type: Schema.Types.ObjectId,
    auto: true,
    required: true,
  },
  selectedAdminID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  adminName: {
    type: String,
    },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const OrderEmail = mongoose.model("OrderEmail", orderEmailSchema);

module.exports = OrderEmail;
