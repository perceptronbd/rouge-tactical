const express = require("express");
const router = express.Router();
const checkPermissionController = require("../../controller/permission/checkPermissionController");
const { checkLogin } = require("../../middleware/token/checkLogin");
const { authRole } = require("../../middleware/role/authRole");

router.get("/checkPermission", authRole(['admin']), checkLogin, checkPermissionController.checkRolePermission);

module.exports = router;