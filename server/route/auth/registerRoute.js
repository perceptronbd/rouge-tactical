const express = require("express");
const router = express.Router();

const registrationController = require("../../controller/auth/registerController");
router.post("/registration", registrationController.createUser);
module.exports = router;