const express = require("express");
const router = express.Router();
const userController = require ("../../../controller/admin/user/userController")
const { checkLogin } = require("../../../middleware/token/checkLogin");

router.get("/getAllEmployeeData",checkLogin, userController.getProfileDataOfAllExistingEmployee);

module.exports = router;