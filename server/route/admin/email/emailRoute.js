const express = require("express");
const router = express.Router();
const emailController = require ("../../../controller/admin/email/emailController")
const { checkLogin } = require("../../../middleware/token/checkLogin");

router.post("/sendPermitEmail",checkLogin, emailController.sendPermitMail);
router.post("/setPermitEmailCredentials",checkLogin, emailController.setPermitEmailCredentials);
router.post("/setMaintenanceEmailCredentials",checkLogin, emailController.setMaintenanceEmailCredentials);
router.post("/sendMaintenanceEmail",checkLogin, emailController.sendMaintenanceEmail);
router.post("/sendOrderListMail",checkLogin, emailController.sendOrderListMail);



module.exports = router;