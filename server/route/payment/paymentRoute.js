const express = require("express");
const router = express.Router();
const serviceController = require ("../../controller/payment/paymentController")
const { checkLogin } = require("../../middleware/token/checkLogin");

router.post("/createService",checkLogin, serviceController.createService);
router.get("/getAllService", checkLogin, serviceController.getAllServicedata);
router.put("/updateService", checkLogin, serviceController.updateService);
router.put("/fetchServiceCost",checkLogin, serviceController.fetchServiceCost);


module.exports = router;