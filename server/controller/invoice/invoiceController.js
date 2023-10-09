const Invoice = require('../../model/invoiceModel');
const asyncHandler = require("express-async-handler");


const createInvoice = asyncHandler(async(req,res) => {
    const {
        date,
        invoiceNumber,
        vendor,
        item,
        quantity,
        totalAmount,
        depositAmount,
        delivered,
        status,
      } = req.body;

      if (!date ||
        !invoiceNumber||
        !vendor||
        !item||
        !quantity||
        !totalAmount||
        !depositAmount||
        !delivered||
        status){
            res.status(400);
            throw new Error("Please fill in all required field")
        }

        const invoice = new Invoice({
            date,
            invoiceNumber,
            vendor,
            item,
            quantity,
            totalAmount,
            depositAmount,
            delivered,
            status,
        })

        await invoice.save();


})

module.exports = { createInvoice };
