const express = require("express");
const router = express.Router();
const emailToAdminController = require ("../../../controller/admin/email/emailToAdminController")
const { checkLogin } = require("../../../middleware/token/checkLogin");

router.post("/employees",checkLogin, emailToAdminController.sendPermitMail);



module.exports = router;