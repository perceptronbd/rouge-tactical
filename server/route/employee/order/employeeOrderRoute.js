const express = require("express");
const router = express.Router();
const employeeOrderController = require ("../../../controller/employee/order/employeeOrderController")
const { checkLogin } = require("../../../middleware/token/checkLogin");

router.post("/createOrder",checkLogin, employeeOrderController.createOrder);
router.get("/getAllOrder",checkLogin, employeeOrderController.getAllOrder);

module.exports = router;