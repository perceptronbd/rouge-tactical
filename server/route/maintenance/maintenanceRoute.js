const express = require("express");
const router = express.Router();
const maintenanceController = require ("../../controller/maintenance/maintenanceController")
const { checkLogin } = require("../../middleware/token/checkLogin");


router.post("/createMaintenance",checkLogin, maintenanceController.createMaintenance);
router.get("/getMaintenance",checkLogin, maintenanceController.getAllMaintenance);
router.delete("/deleteMaintenance",checkLogin, maintenanceController.deleteMaintenance);
router.put("/updateMaintenance",checkLogin, maintenanceController.updateMaintenance);





module.exports = router;