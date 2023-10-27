const express = require("express");
const router = express.Router();
const serviceController = require ("../../controller/payment/paymentController")
const { checkLogin } = require("../../middleware/token/checkLogin");

router.post("/createService",checkLogin, serviceController.createService);
router.get("/getAllService", checkLogin, serviceController.getAllServicedata);
router.put("/updateService", checkLogin, serviceController.updateService);
router.get("/fetchServiceCost",checkLogin, serviceController.fetchServiceCost);
router.delete("/deleteService",checkLogin, serviceController.deleteService);
router.get("/getInvoice",checkLogin, serviceController.filterInvoice);



module.exports = router;