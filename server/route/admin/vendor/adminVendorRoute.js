const express = require("express");
const router = express.Router();
const adminVendorController = require ("../../../controller/admin/vendor/adminVendorController")
const { checkLogin } = require("../../../middleware/token/checkLogin");

router.post("/createVendor",checkLogin, adminVendorController.createVendor);
router.get("/getAllVendor",checkLogin, adminVendorController.getAllVendor);

module.exports = router;