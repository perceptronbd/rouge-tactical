const Production = require("../../model/productionModel");
const User = require("../../model/userModel");


const createProduction = async (req, res) => {
    console.log(req.userId);
    console.log(req.email);

    const { status, batch, quantity, range, style, serialNumber, missing } = req.body;

    try {
        const existingUser = await User.findOne({
            _id: req.userId
        });

        if (!existingUser) {
            return res.status(404).json({ error: "No User found" });
        }

        if (!status || !batch || !quantity || !range || !style || !serialNumber || !missing) {
            return res.status(400).json({
                error: "All required fields must be provided for creating Production"
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

        res.json({
            code: 200,
            data: {
                    newProductionData
                }
            
        });
    } catch (error) {
        console.error("Error creating Production:", error);
        res.status(500).json({ error: "Internal server error" });
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

module.exports = {
    createProduction,
    getAllProductions
  };