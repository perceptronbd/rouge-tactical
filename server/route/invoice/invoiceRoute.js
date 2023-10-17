const express = require("express");
const router = express.Router();
const invoiceController = require ("../../controller/invoice/invoiceController")
const { checkLogin } = require("../../middleware/token/checkLogin");

router.post("/createInvoice",checkLogin, invoiceController.createInvoice);
router.get("/getAllInvoice", checkLogin, invoiceController.getAllInvoice);
router.get("/getInvoiceOfSelectedVendor", checkLogin, invoiceController.getInvoiceOfSelectedVendor);
router.put("/updateInvoice",checkLogin, invoiceController.updateInvoice);


module.exports = router;