const Vendor = require("../../model/vendorModel");
const User = require("../../model/userModel");
const Invoice = require("../../model/invoiceModel");

const createInvoice = async (req, res) => {
  console.log(req.userId);
  console.log(req.email);

  const {
    date,
    invoiceNumber,
    vendor,
    items,
    remainingAmount,
    totalAmount,
    depositedAmount,
  } = req.body;

  try {
    const existingUser = await User.findOne({
      _id: req.userId,
    });
    const existingVendor = await Vendor.findOne({
      _id: vendor,
    });

    if (!existingUser) {
      return res.status(404).json({ message: "No User found" });
    }
    if (!existingVendor) {
      return res.status(404).json({ message: "No Vendor found" });
    }

    if (
      !date ||
      !invoiceNumber ||
      !vendor ||
      !items ||
      !remainingAmount ||
      !totalAmount ||
      !depositedAmount
    ) {
      return res.status(400).json({
        message: "All required fields must be provided!",
      });
    }

    const existingInvoice = await Invoice.findOne({
      invoiceNumber: invoiceNumber,
    });

    if (existingInvoice) {
      return res.status(400).json({
        message: "An invoice with the same invoice number already exists!",
      });
    }

    const newInvoiceData = {
      date: date,
      invoiceNumber: invoiceNumber,
      vendor: vendor,
      vendorName: existingVendor.name,
      items: items,
      remainingAmount: remainingAmount,
      totalAmount: totalAmount,
      depositAmount: depositedAmount,
      status: "open",
      createdAt: Date.now(),
    };

    const newInvoice = new Invoice(newInvoiceData);

    await newInvoice.save();

    res.status(200).json({
      userId: req.userId,
      data: newInvoiceData,
      message: "Invoice created successfully!",
    });
  } catch (error) {
    console.error("Error creating invoice:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getAllInvoice = async (req, res) => {
  console.log(req.userId);
  console.log(req.email);

  try {
    const existingUser = await User.findOne({
      _id: req.userId,
    });
    const existingInvoice = await Invoice.find().sort({ date: -1 });
    if (!existingUser) {
      return res.status(404).json({ message: "No User found!" });
    }

    if (!existingInvoice) {
      return res.status(400).json({
        error: "No Invoice found!",
      });
    }

    const formattedInvoices = existingInvoice.map((data) => ({
      invoiceId: data._id,
      date: data.date,
      invoiceNumber: data.invoiceNumber,
      vendorId: data.vendor,
      vendorName: data.vendorName,
      items: data.items,
      totalAmount: data.totalAmount,
      remainingAmount: data.remainingAmount,
      depositAmount: data.depositAmount,
      delivered: data.delivered,
      status: data.status,
      createdAt: data.createdAt,
      updateAt: data.updatedAt,
    }));

    res.status(200).json({
      userId: req.userId,
      data: formattedInvoices,
    });
  } catch (error) {
    console.error("Error fetching invoice list:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getInvoiceOfSelectedVendor = async (req, res) => {
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
    const existingVendorInvoice = await Invoice.find({
      vendor: vendor,
    });

    if (!existingUser) {
      return res.status(404).json({ error: "No User found" });
    }
    if (!existingVendor) {
      return res.status(404).json({ error: "No Vendor found" });
    }
    if (!existingVendorInvoice) {
      return res
        .status(404)
        .json({ error: "No Invoice found for this vendor" });
    }

    const formattedInvoice = existingVendorInvoice.map((data) => ({
      invoiceId: data._id,
      date: data.date,
      invoiceNumber: data.invoiceNumber,
      vendorId: data.vendor,
      item: data.items,
      quantity: data.quantity,
      totalAmount: data.totalAmount,
      depositAmount: data.depositAmount,
      delivered: data.delivered,
      status: data.status,
      createdAt: data.createdAt,
      updateAt: data.updatedAt,
    }));

    res.json({
      code: 200,
      data: {
        userId: req.userId,
        invoiceDataForSelectedVendor: formattedInvoice,
      },
    });
  } catch (error) {
    console.error("Error fetching invoice list:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const updateInvoice = async (req, res) => {
  const {
    invoiceId,
    date,
    vendor,
    invoiceNumber,
    items,
    quantity,
    totalAmount,
    depositAmount,
    delivered,
    status,
  } = req.body;

  try {
    const existingInvoice = await Invoice.findOne({
      _id: invoiceId,
      vendor: vendor,
    });

    if (!existingInvoice) {
      return res.status(404).json({ message: "No Invoice found" });
    }

    if (date != null && date !== "") {
      existingInvoice.date = date;
    }
    if (invoiceNumber != null && invoiceNumber !== "") {
      existingInvoice.invoiceNumber = invoiceNumber;
    }
    // if (item != null && item !== "") {
    //   existingInvoice.item = item;
    // }
    if (items != null && items.length > 0) {
      existingInvoice.items = items;
    }
    if (quantity != null && quantity !== "") {
      existingInvoice.quantity = quantity;
    }
    if (totalAmount != null && totalAmount !== "") {
      existingInvoice.totalAmount = totalAmount;
    }
    if (depositAmount != null && depositAmount !== "") {
      existingInvoice.depositAmount = depositAmount;
    }
    if (delivered != null && delivered !== "") {
      existingInvoice.delivered = delivered;
    }
    if (status != null && status !== "") {
      existingInvoice.status = status;
    }

    existingInvoice.updatedAt = new Date();

    const updatedInvoice = await existingInvoice.save();

    const formattedUpdatedInvoice = {
      invoiceId: updatedInvoice._id,
      date: updatedInvoice.date,
      invoiceNumber: updatedInvoice.invoiceNumber,
      vendorId: updatedInvoice.vendor,
      item: updatedInvoice.items,
      quantity: updatedInvoice.quantity,
      totalAmount: updatedInvoice.totalAmount,
      depositAmount: updatedInvoice.depositAmount,
      delivered: updatedInvoice.delivered,
      status: updatedInvoice.status,
      createdAt: updatedInvoice.createdAt,
      updatedAt: updatedInvoice.updatedAt,
    };

    return res.status(200).json({
      userId: req.userId,
      data: formattedUpdatedInvoice,
      message: "Invoice updated successfully!",
    });
  } catch (error) {
    console.error("Error updating invoice:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const updateProduction = async (req, res) => {
  const {
    productionId,
    status,
    batch,
    quantity,
    range,
    style,
    serialNumber,
    missing,
  } = req.body;

  try {
    const existingProduction = await Production.findOne({
      _id: productionId,
    });

    if (!existingProduction) {
      return res.status(404).json({ message: "No Production found" });
    }

    if (status != null && status !== "") {
      existingProduction.status = status;
    }
    if (batch != null && batch !== "") {
      existingProduction.batch = batch;
    }
    if (quantity != null && quantity !== "") {
      existingProduction.quantity = quantity;
    }
    if (range != null && range !== "") {
      existingProduction.range = range;
    }
    if (style != null && style !== "") {
      existingProduction.style = style;
    }
    if (serialNumber != null && serialNumber !== "") {
      existingProduction.serialNumber = serialNumber;
    }
    if (missing != null && missing !== "") {
      existingProduction.missing = missing;
    }

    existingProduction.updatedAt = new Date();

    const updatedProduction = await existingProduction.save();

    const formattedUpdatedProduction = {
      productionId: updatedProduction._id,
      status: updatedProduction.status,
      batch: updatedProduction.batch,
      quantity: updatedProduction.quantity,
      range: updatedProduction.range,
      style: updatedProduction.style,
      serialNumber: updatedProduction.serialNumber,
      missing: updatedProduction.missing,
      createdAt: updatedProduction.createdAt,
      updatedAt: updatedProduction.updatedAt,
    };

    return res.status(200).json({
      userId: req.userId,
      updatedProductionData: formattedUpdatedProduction,
    });
  } catch (error) {
    console.error("Error updating production:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const deleteInvoice = async (req, res) => {
  const { invoiceId } = req.body;

  try {
    // Find the invoice by ID and delete it
    const deletedInvoice = await Invoice.findByIdAndDelete(invoiceId);

    if (!deletedInvoice) {
      return res.status(404).json({ message: "Invoice not found" });
    }

    return res.status(200).json({
      message: "Invoice deleted successfully!",
      deletedInvoiceId: deletedInvoice._id,
    });
  } catch (error) {
    console.error("Error deleting invoice:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  createInvoice,
  getAllInvoice,
  getInvoiceOfSelectedVendor,
  updateInvoice,
  deleteInvoice,
  updateProduction,
};
