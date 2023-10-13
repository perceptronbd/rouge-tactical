const Vendor = require("../../model/vendorModel");
const User = require("../../model/userModel");
const Invoice = require("../../model/invoiceModel");
const PurchaseOrder = require("../../model/purchaseModel");

const createPurchaseOrder = async (req, res) => {
  console.log(req.userId);
  console.log(req.email);

  const {
    date,
    orderNumber,
    size,
    item,
    quantity,
    price,
    totalAmount,
    depositAmount,
    vendor,
    substituteVendor,
    deliveredItems,
    status,
    createdBy,
  } = req.body;

  try {
    const existingUser = await User.findOne({
      _id: req.userId,
    });
    const existingVendor = await Vendor.findOne({
      _id: vendor,
    });

    if (!existingUser) {
      return res.status(404).json({ error: "No User found" });
    }
    if (!existingVendor) {
      return res.status(404).json({ error: "No Vendor found" });
    }

    if (
      !orderNumber ||
      !vendor ||
      !price ||
      !size ||
      !item ||
      !quantity ||
      !totalAmount ||
      !vendor ||
      !createdBy
    ) {
      return res.status(400).json({
        error: "All required fields must be provided for creating Invoice!",
      });
    }

    const newPurchaseOrderData = {
      date: date,
      orderNumber: orderNumber,
      size: size,
      item: item,
      quantity: quantity,
      price: price,
      totalAmount: totalAmount,
      depositAmount: depositAmount,
      vendor: vendor,
      substituteVendor: substituteVendor,
      deliveredItems: deliveredItems,
      status: status,
      createdBy: createdBy,
      createdAt: Date.now(),
    };

    const newPurchaseOrder = new PurchaseOrder(newPurchaseOrderData);

    await newPurchaseOrder.save();

    res.json({
      code: 200,
      data: {
        userId: req.userId,
        newPurchaseOrderData: newPurchaseOrder,
      },
    });
  } catch (error) {
    console.error("Error creating PO:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getAllPurchaseOrder = async (req, res) => {
  console.log(req.userId);
  console.log(req.email);

  try {
    const existingUser = await User.findOne({
      _id: req.userId,
    });
    const existingPurchaseOrder = await PurchaseOrder.find().sort({ date: -1 });
    if (!existingUser) {
      return res.status(404).json({ error: "No User found!" });
    }

    if (!existingPurchaseOrder) {
      return res.status(400).json({
        error: "No PO found!",
      });
    }

    const formattedPurchaseOrder = existingPurchaseOrder.map((data) => ({
      purchaseOrderId: data._id,
      date: data.date,
      orderNumber: data.orderNumber,
      size: data.size,
      item: data.item,
      quantity: data.quantity,
      price: data.price,
      totalAmount: data.totalAmount,
      depositAmount: data.depositAmount,
      vendor: data.vendor,
      substituteVendor: data.substituteVendor,
      deliveredItems: data.deliveredItems,
      status: data.status,
      createdBy: data.createdBy,
      createdAt: data.createdAt,
      updateAt: data.updatedAt,
    }));

    res.json({
      code: 200,
      data: {
        userId: req.userId,
        purchaseOrderData: formattedPurchaseOrder,
      },
    });
  } catch (error) {
    console.error("Error fetching PO list:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getPurchaseOrderOfSelectedVendor = async (req, res) => {
  console.log(req.userId);
  console.log(req.email);

  const { vendor } = req.body;

  try {
    const existingUser = await User.findOne({
      _id: req.userId,
    });
    const existingVendor = await Vendor.findOne({
      _id: vendor,
    });
    const existingPurchaseOrder = await PurchaseOrder.find({
      vendor: vendor,
    });

    if (!existingUser) {
      return res.status(404).json({ error: "No User found" });
    }
    if (!existingVendor) {
      return res.status(404).json({ error: "No Vendor found" });
    }
    if (!existingPurchaseOrder) {
      return res.status(404).json({ error: "No PO found for this vendor" });
    }

    const formattedPurchaseOrder = existingPurchaseOrder.map((data) => ({
      purchaseOrderId: data._id,
      date: data.date,
      orderNumber: data.orderNumber,
      size: data.size,
      item: data.item,
      quantity: data.quantity,
      price: data.price,
      totalAmount: data.totalAmount,
      depositAmount: data.depositAmount,
      vendor: data.vendor,
      substituteVendor: data.substituteVendor,
      deliveredItems: data.deliveredItems,
      status: data.status,
      createdBy: data.createdBy,
      createdAt: data.createdAt,
      updateAt: data.updatedAt,
    }));

    res.json({
      code: 200,
      data: {
        userId: req.userId,
        purchaseOrderDataForSelectedVendor: formattedPurchaseOrder,
      },
    });
  } catch (error) {
    console.error("Error fetching PO list:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const updatePurchaseOrder = async (req, res) => {
  const {
    purchaseOrderId,
    date,
    orderNumber,
    size,
    item,
    quantity,
    price,
    totalAmount,
    depositAmount,
    vendor,
    substituteVendor,
    deliveredItems,
    status,
    createdBy,
  } = req.body;

  try {
    const existingPurchaseOrder = await PurchaseOrder.findOne({
      _id: purchaseOrderId,
      vendor: vendor,
    });

    if (!existingPurchaseOrder) {
      return res.status(404).json({ error: "No PO found" });
    }

    if (date != null && date !== "") {
      existingPurchaseOrder.date = date;
    }
    if (orderNumber != null && orderNumber !== "") {
      existingPurchaseOrder.orderNumber = orderNumber;
    }
    if (item != null && item !== "") {
      existingPurchaseOrder.item = item;
    }
    if (quantity != null && quantity !== "") {
      existingPurchaseOrder.quantity = quantity;
    }
    if (totalAmount != null && totalAmount !== "") {
      existingPurchaseOrder.totalAmount = totalAmount;
    }
    if (depositAmount != null && depositAmount !== "") {
      existingPurchaseOrder.depositAmount = depositAmount;
    }
    if (substituteVendor != null && substituteVendor !== "") {
      existingPurchaseOrder.substituteVendor = substituteVendor;
    }
    if (status != null && status !== "") {
      existingPurchaseOrder.status = status;
    }
    if (size != null && size !== "") {
      existingPurchaseOrder.size = size;
    }
    if (price != null && price !== "") {
      existingPurchaseOrder.price = price;
    }
    if (deliveredItems != null && deliveredItems !== "") {
      existingPurchaseOrder.deliveredItems = deliveredItems;
    }
    if (date != null && date !== "") {
      existingPurchaseOrder.date = date;
    }
    if (createdBy != null && createdBy !== "") {
      existingPurchaseOrder.createdBy = createdBy;
    }

    existingPurchaseOrder.updatedAt = new Date();

    const updatedPurchaseOrder = await existingPurchaseOrder.save();

    const formattedUpdatedPurchaseOrder = {
      purchaseOrderId: updatedPurchaseOrder._id,
      date: updatedPurchaseOrder.date,
      date: updatedPurchaseOrder.date,
      orderNumber: updatedPurchaseOrder.orderNumber,
      size: updatedPurchaseOrder.size,
      item: updatedPurchaseOrder.item,
      quantity: updatedPurchaseOrder.quantity,
      price: updatedPurchaseOrder.price,
      totalAmount: updatedPurchaseOrder.totalAmount,
      depositAmount: updatedPurchaseOrder.depositAmount,
      vendor: updatedPurchaseOrder.vendor,
      substituteVendor: updatedPurchaseOrder.substituteVendor,
      deliveredItems: updatedPurchaseOrder.deliveredItems,
      status: updatedPurchaseOrder.status,
      createdBy: updatedPurchaseOrder.createdBy,
      createdAt: updatedPurchaseOrder.createdAt,
      updateAt: updatedPurchaseOrder.updatedAt,
    };

    return res.status(200).json({
      code: 200,
      data: {
        userId: req.userId,
        updatedPurchaseOrderData: formattedUpdatedPurchaseOrder,
      },
    });
  } catch (error) {
    console.error("Error updating PO:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  createPurchaseOrder,
  getAllPurchaseOrder,
  getPurchaseOrderOfSelectedVendor,
  updatePurchaseOrder,
};
