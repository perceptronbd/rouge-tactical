const User = require("../../../model/userModel");
const Order = require("../../../model/orderModel");

const createOrder = async (req, res) => {
  console.log(req.userId);
  console.log(req.email);
  const {
    item,
    size,
    quantity,
    price,
    totalAmount,
    depositAmount,
    deliveredItems,
    //get vendor ID but display name in frontend
    vendor,
    substituteVendor,
    needed,
  } = req.body;

  try {
    const existingUser = await User.findOne({ _id: req.userId });

    // console.log(existingUser);
    if (!existingUser) {
      return res.status(404).json({ error: "No User found" });
    }
    if (
      !item ||
      !size ||
      !quantity ||
      !price ||
      !totalAmount ||
      !depositAmount ||
      !deliveredItems ||
      !vendor ||
      !needed
    ) {
      return res.status(400).json({
        error: "All required fields must be provided for creating Order!",
      });
    }

    const newOrderData = {
      item: item,
      size: size,
      quantity: quantity,
      price: price,
      totalAmount: totalAmount,
      depositAmount: depositAmount,
      deliveredItems: deliveredItems,
      //will use vendor ID after creating real vendor (extracting vendor ID from Vendor schema in DB)
      vendor: req.userId,
      date: Date.now(),
      needed: needed,
      createdBy: req.userId,
    };

    if (substituteVendor !== "") {
      newOrderData.substituteVendor = substituteVendor;
    }

    const newOrder = new Order(newOrderData);

    await newOrder.save();

    res.status(200).json({
      userId: req.userId,
      data: newOrder,
    });
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getAllOrder = async (req, res) => {
  console.log(req.userId);
  console.log(req.email);
  console.log(req.authenticated);

  try {
    const existingUser = await User.findOne({ _id: req.userId });
    const existingOrder = await Order.find().sort({
      date: -1,
    });
    // console.log(existingUser);
    if (!existingUser) {
      return res
        .status(404)
        .json({ error: "User with such credential doesn't exist!" });
    }
    if (!existingOrder) {
      return res.status(404).json({ error: "No Order available!" });
    }

    const formattedOrders = existingOrder.map((data) => ({
      orderId: data._id,
      item: data.item,
      size: data.size,
      quantity: data.quantity,
      price: data.price,
      totalAmount: data.totalAmount,
      depositAmount: data.depositAmount,
      deliveredItems: data.deliveredItems,
      //will send vendor name after creating vendor table
      vendor: data.vendor,
      date: data.date,
      needed: data.needed,
      status: data.status,
      approved: data.approved,
      orderedBy: data.createdBy,
      purchaseOrdered: data.purchaseOrdered,
      ordered: data.ordered,
      requested: data.requested,
      approvedRequest: data.approvedRequest,
      createdAt: data.createdAt,
    }));

    // console.log(formattedUsers);
    res.status(200).json({
      userId: req.userId,
      data: formattedOrders,
    });
  } catch (error) {
    console.error("Error fetching employee order :", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  createOrder,
  getAllOrder,
};
