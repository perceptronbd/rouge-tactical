const express = require("express");
const router = express.Router();
const orderController = require ("../../controller/order/orderController")
const { checkLogin } = require("../../middleware/token/checkLogin");

router.post("/createOrder",checkLogin, orderController.createOrder);
router.get("/getAllOrder", checkLogin, orderController.getAllOrder);
router.put("/updateApprovalStatus",checkLogin, orderController.updateOrderApprovalStatus);


module.exports = router;