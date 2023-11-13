const express = require("express");
const router = express.Router();
const profileController = require("../../../controller/employee/profile/profileController");
const { checkLogin } = require("../../../middleware/token/checkLogin");

router.get(
  "/getEmployeeProfileData",
  checkLogin,
  profileController.getProfileDataOfLoggedInEmployee
);
router.get(
  "/togglePreferredEmail",
  checkLogin,
  profileController.togglePreferredEmail
);

module.exports = router;
