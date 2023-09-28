const express = require("express");
const router = express.Router();
const vendorController = require ("../../controller/vendor/vendorController")
const { checkLogin } = require("../../middleware/token/checkLogin");

router.post("/createVendor",checkLogin, vendorController.createVendor);
router.get("/getAllVendor",checkLogin, vendorController.getAllVendor);

module.exports = router;