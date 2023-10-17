const express = require("express");
const router = express.Router();
const profileController = require ("../../../controller/employee/profile/profileController")
const { checkLogin } = require("../../../middleware/token/checkLogin");

router.get("/getEmployeeProfileData",checkLogin, profileController.getProfileDataOfLoggedInEmployee);

module.exports = router;