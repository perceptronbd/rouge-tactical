const express = require("express");
const router = express.Router();
const emailController = require ("../../../controller/admin/email/emailController")
const { checkLogin } = require("../../../middleware/token/checkLogin");

router.post("/sendPermitEmail",checkLogin, emailController.sendPermitMail);
router.post("/setPermitEmailCredentials",checkLogin, emailController.setPermitEmailCredentials);
router.post("/setAdminNotifyEmailCredentials",checkLogin, emailController.setAdminNotifyEmailCredentials);
router.post("/sendNotifyAdminMail",checkLogin, emailController.sendNotifyAdminMail);



module.exports = router;