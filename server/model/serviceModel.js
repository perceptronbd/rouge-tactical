const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const serviceSchema = new Schema({
    
    service: {
        type: String,
        required: true,
    },
    accountNumber: {
        type: String,
        required: true,
    },
    cost: {
        type: Number,
        required: true,
    },
    dueDate: {
        type: Date,
        required: true,
    }
});

const Service = mongoose.model("Service", serviceSchema);

module.exports = Service;
