const Production = require("../../model/productionModel");
const User = require("../../model/userModel");

const createProduction = async (req, res) => {
  console.log(req.userId);
  console.log(req.email);

  const { status, batch, quantity, range, style, serialNumber, missing } =
    req.body;

  try {
    const existingUser = await User.findOne({
      _id: req.userId,
    });

    if (!existingUser) {
      return res.status(404).json({ message: "No User found" });
    }

    if (
      !status ||
      !batch ||
      !quantity ||
      !range ||
      !style ||
      !serialNumber ||
      !missing
    ) {
      return res.status(400).json({
        message: "All required fields must be provided for creating Production",
      });
    }

    const newProductionData = {
      status: status,
      batch: batch,
      quantity: quantity,
      range: range,
      style: style,
      serialNumber: serialNumber,
      missing: missing,
    };

    const newProduction = new Production(newProductionData);

    await newProduction.save();

    res.status(200).json({
      data: newProductionData,
      message: "Production created successfully",
    });
  } catch (error) {
    console.error("Error creating Production:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getAllProductions = async (req, res) => {
  console.log(req.userId);
  console.log(req.email);

  try {
    const existingUser = await User.findOne({
      _id: req.userId,
    });

    if (!existingUser) {
      return res.status(404).json({ error: "No User found!" });
    }

    const existingProductions = await Production.find().sort({ date: -1 });

    if (!existingProductions) {
      return res.status(400).json({
        error: "No Productions found!",
      });
    }

    const formattedProductions = existingProductions.map((data) => ({
      productionId: data._id,
      status: data.status,
      batch: data.batch,
      quantity: data.quantity,
      range: data.range,
      style: data.style,
      serialNumber: data.serialNumber,
      missing: data.missing,
    }));

    res.json({
      code: 200,
      data: {
        userId: req.userId,
        productionData: formattedProductions,
      },
    });
  } catch (error) {
    console.error("Error fetching production list:", error);
    res.status(500).json({ error: "Internal server error" });
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
      return res.status(404).json({ error: "No Production found" });
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
      code: 200,
      data: {
        userId: req.userId,
        updatedProductionData: formattedUpdatedProduction,
      },
    });
  } catch (error) {
    console.error("Error updating production:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const deleteProduction = async (req, res) => {
  try {
    // Get the production ID from the request parameters
    const { productionId } = req.body;

    // Find the production by its ID and remove it
    const deletedProduction = await Production.findByIdAndRemove(productionId);

    if (!deletedProduction) {
      return res.status(404).json({ error: "Production not found" });
    }

    // If the production was successfully deleted, return a success response
    res.status(200).json({
      code: 200,
      message: "Production deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting production:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  createProduction,
  getAllProductions,
  updateProduction,
  deleteProduction,
};
