const mongoose = require("mongoose");

const productionSchema = new mongoose.Schema({
    status: {
        type: String,
        enum: ["Machining", "Building", "Coating", "Assembly"],
        required: true
    },
    batch: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    range: {
        type: [Number], // an array of numbers
        required: true
    },
    serialNumber: {
        type: Number,
        required: true
    },
    missing: {
        type: Number,
        required: true
    }
});

const Production = mongoose.model("Production", productionSchema);

module.exports = Production;