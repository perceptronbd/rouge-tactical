const express = require("express");
const router = express.Router();
const maintenanceController = require ("../../controller/maintenance/maintenanceController")
const { checkLogin } = require("../../middleware/token/checkLogin");


router.post("/createMaintenance",checkLogin, maintenanceController.createMaintenance);


module.exports = router;