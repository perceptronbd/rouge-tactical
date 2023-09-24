const express = require("express");
const router = express.Router();

const loginController = require("../../controller/auth/loginController");
router.post("/login", loginController.loginUser);
module.exports = router;