const mongoose = require("mongoose");

const productionSchema = new mongoose.Schema({
    status: {
        type: String,
        enum: ["Machining", "Building", "Coating", "Assembly"],
        required: true
    },
    batch: {
        type: String,
        required: true
    },
    quantity: {
        type: String,
        required: true
    },
    range: {
        min: {
            type: String,
            required: true
        },
        max: {
            type: String,
            required: true
        }
    },
    style: {
        type: String,
        required: true
    },
    serialNumber: {
        type: String,
        required: true
    },
    missing: {
        type: Number,
        required: true
    }
});

const Production = mongoose.model("Production", productionSchema);

module.exports = Production;
