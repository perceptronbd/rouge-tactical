const express = require("express");
const router = express.Router();

const loginController = require("../../controller/auth/loginController");
const registrationController = require("../../controller/auth/registerController");
router.post("/registration", registrationController.createUser);
router.post("/login", loginController.loginUser);
module.exports = router;
