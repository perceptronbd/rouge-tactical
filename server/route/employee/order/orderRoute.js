const express = require("express");
const router = express.Router();
const orderController = require ("../../../controller/admin/order/orderController")
const { checkLogin } = require("../../../middleware/token/checkLogin");

router.post("/createOrder",checkLogin, orderController.createOrder);
router.get("/getAllOrder", checkLogin, orderController.getAllOrder);

module.exports = router;