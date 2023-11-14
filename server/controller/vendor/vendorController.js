const Vendor = require("../../model/vendorModel");
const User = require("../../model/userModel");

const createVendor = async (req, res) => {
  console.log(req.userId);
  console.log(req.email);

  const {
    name,
    contact,
    phone,
    email,
    address,
    //get id for orders, po and invoices but display name in frontend
    orders,
    purchaseOrders,
    invoices,
  } = req.body;

  try {
    // Check if the email or name already exists in the database
    const existingVendor = await Vendor.findOne({
      $or: [{ name: name }, { email: email }],
    });

    if (existingVendor) {
      return res.status(400).json({
        message: "Vendor with the same name or email already exists!",
      });
    }

    const existingUser = await User.findOne({
      _id: req.userId,
    });

    if (!existingUser) {
      return res.status(404).json({ message: "No User found" });
    }

    if (!name || !contact || !phone || !email || !address) {
      return res.status(400).json({
        message: "All required fields must be provided for creating Vendor!",
      });
    }

    const newVendorData = {
      name: name,
      contact: contact,
      phone: phone,
      email: email,
      address: address,
      createdAt: Date.now(),
    };

    // Check if orders array is not empty before adding it
    if (orders && orders.length > 0) {
      newVendorData.orders = orders;
    }

    // Check if purchaseOrders array is not empty before adding it
    if (purchaseOrders && purchaseOrders.length > 0) {
      newVendorData.purchaseOrders = purchaseOrders;
    }

    // Check if invoices array is not empty before adding it
    if (invoices && invoices.length > 0) {
      newVendorData.invoices = invoices;
    }

    const newVendor = new Vendor(newVendorData);

    await newVendor.save();

    res.status(200).json({
      userId: req.userId,
      data: newVendor,
      message: "Vendor created successfully!",
    });
  } catch (error) {
    console.error("Error creating vendor:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getAllVendor = async (req, res) => {
  console.log(req.userId);
  console.log(req.email);

  try {
    const existingUser = await User.findOne({
      _id: req.userId,
    });
    const existingVendor = await Vendor.find().sort({ date: -1 });
    if (!existingUser) {
      return res.status(404).json({ message: "No User found!" });
    }

    if (!existingVendor) {
      return res.status(400).json({
        message: "No Vendor found!",
      });
    }

    const formattedVendors = existingVendor.map((data) => ({
      vendorId: data._id,
      name: data.name,
      contact: data.contact,
      phone: data.phone,
      email: data.email,
      address: data.address,
      orders: data.orders,
      purchaseOrders: data.purchaseOrders,
      invoices: data.invoices,
    }));

    res.status(200).json({
      userId: req.userId,
      data: formattedVendors,
    });
  } catch (error) {
    console.error("Error fetching vendor list:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  createVendor,
  getAllVendor,
};
