const express = require("express");
const router = express.Router();
const adminOrderController = require ("../../../controller/admin/order/adminOrderController")
const { checkLogin } = require("../../../middleware/token/checkLogin");

router.post("/createOrder",checkLogin, adminOrderController.createOrder);
router.get("/getAllOrder", checkLogin, adminOrderController.getAllOrder);
router.put("/updateApprovalStatus",checkLogin, adminOrderController.updateOrderApprovalStatus);


module.exports = router;