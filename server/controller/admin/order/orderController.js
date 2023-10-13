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
    status,
    purchaseOrdered,
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
      status: true,
      approved: false,
      createdBy: req.userId,
      purchaseOrdered: purchaseOrdered,
      ordered: true,
      requested: false,
      approvedRequest: false,
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
      createdAt : data.createdAt
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

const updateOrderApprovalStatus = async (req, res) => {
  console.log(req.userId);
  console.log(req.email);
  console.log(req.authenticated);

  const { approved, orderId } = req.body;

  try {
    const existingUser = await User.findOne({ _id: req.userId, role: "admin" });
    const existingOrder = await Order.findOne({
      createdBy: req.userId,
      _id: orderId,
    });
    console.log(existingUser);
    console.log(existingOrder);
    if (!existingUser) {
      return res
        .status(404)
        .json({ error: "Admin with such credential doesn't exist!" });
    }
    if (!existingOrder) {
      return res.status(404).json({ error: "No Order available!" });
    }

    const updateOrderApprovalStatus = await Order.updateOne(
      { _id: orderId },
      { $set: { approved: approved } }
    );

    const updatedOrder = await Order.findOne({ _id: orderId });

    console.log(updatedOrder);

    console.log(updateOrderApprovalStatus);

    // console.log(formattedUsers);
    res.json({
      code: 200,
      data: {
        userId: req.userId,
        updatedOrder: updatedOrder,
      },
    });
  } catch (error) {
    console.error("Error updating order approval status :", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const editOrder = async (req, res) => {
  console.log(req.userId);
  console.log(req.email);
  console.log(req.authenticated);

  const editRecords = req.body;

  try {
    const existingUser = await User.findOne({ _id: req.userId, role: "admin" });

    console.log(existingUser);
    // console.log(existingOrder);
    if (!existingUser) {
      return res
        .status(404)
        .json({ error: "Admin with such credential doesn't exist!" });
    }
    

    if (!Array.isArray(editRecords)) {
      return res.status(400).json({ message: 'Invalid data format. Expecting an array.' });
    }

    const updatedRecords = [];

    for (const record of editRecords) {
      const id = record.id;
      const updatedRecord = await Order.findOneAndUpdate({ _id: id }, record, { new: true });

      if (!updatedRecord) {
        return res.status(404).json({ message: `Record with id ${id} not found` });
      }

      updatedRecords.push({
        orderId: updatedRecord._id,
        item: updatedRecord.item,
        size: updatedRecord.size,
        quantity: updatedRecord.quantity,
        price: updatedRecord.price,
        totalAmount: updatedRecord.totalAmount,
        depositAmount: updatedRecord.depositAmount,
        deliveredItems: updatedRecord.deliveredItems,
        vendor: updatedRecord.vendor,
        date: updatedRecord.date,
        needed: updatedRecord.needed,
        status: updatedRecord.status,
        approved: updatedRecord.approved,
        orderedBy: updatedRecord.createdBy,
        purchaseOrdered: updatedRecord.purchaseOrdered,
        ordered: updatedRecord.ordered,
        requested: updatedRecord.requested,
        approvedRequest: updatedRecord.approvedRequest,
        createdAt: updatedRecord.createdAt,
      });
    }


    
    res.json({
      code: 200,
      data: {
        userId: req.userId,
        editedOrder: updatedRecords,
      },
    });
  } catch (error) {
    console.error("Error editing order :", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  createOrder,
  getAllOrder,
  updateOrderApprovalStatus,
  editOrder
};
