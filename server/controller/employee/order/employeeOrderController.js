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
    vendor,
    substituteVendor,
    needed,
    status,
    purchaseOrdered,
  } = req.body;

  try {
    const existingUser = await User.findOne({
      _id: req.userId,
      role: "employee",
    });

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
      !needed ||
      !status ||
      !purchaseOrdered
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
      status: status,
      approved: false,
      createdBy: req.userId,
      purchaseOrdered: purchaseOrdered,
    };

    if (substituteVendor !== "") {
      newOrderData.substituteVendor = substituteVendor;
    }

    const newOrder = new Order(newOrderData);

    await newOrder.save();

    res.json({
      code: 200,
      data: {
        userId: req.userId,
        orderedData: newOrder,
      },
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
    const existingUser = await User.findOne({
      _id: req.userId,
      role: "employee",
    });
    const existingOrder = await Order.find({ createdBy: req.userId }).sort({
      date: -1,
    });
    // console.log(existingUser);
    if (!existingUser) {
      return res
        .status(404)
        .json({ error: "Employee with such credential doesn't exist!" });
    }
    if (!existingOrder) {
      return res.status(404).json({ error: "No Order available!" });
    }

    const formattedOrders = existingOrder.map((data) => ({
      orderId: _id,
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
      createdBy: data.createdBy,
      purchaseOrdered: data.purchaseOrdered,
    }));

    // console.log(formattedUsers);
    res.json({
      code: 200,
      data: {
        userId: req.userId,
        existingOrders: formattedOrders,
      },
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
