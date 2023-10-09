const express = require("express");
const router = express.Router();
const userController = require ("../../../controller/admin/user/userController")
const { checkLogin } = require("../../../middleware/token/checkLogin");

router.get("/getAllUserData",checkLogin, userController.getProfileDataOfAllExistingUser);
router.post("/addEmployee",checkLogin, userController.addEmployee);

module.exports = router;