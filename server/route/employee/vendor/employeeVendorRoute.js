const express = require("express");
const router = express.Router();
const employeeVendorController = require ("../../../controller/employee/vendor/employeeVendorController")
const { checkLogin } = require("../../../middleware/token/checkLogin");

router.post("/createVendor",checkLogin, employeeVendorController.createVendor);
router.get("/getAllVendor",checkLogin, employeeVendorController.getAllVendor);

module.exports = router;