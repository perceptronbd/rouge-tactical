const express = require("express");
const router = express.Router();
const userController = require("../../../controller/admin/user/userController");
const { checkLogin } = require("../../../middleware/token/checkLogin");

router.get(
  "/getAllUserData",
  checkLogin,
  userController.getProfileDataOfAllExistingUser
);
router.post("/addEmployee", checkLogin, userController.addEmployee);
router.put(
  "/updateEmployee/:userId",
  checkLogin,
  userController.updateEmployee
);
router.delete(
  "/deleteEmployee/:userId",
  checkLogin,
  userController.deleteEmployee
);

module.exports = router;
