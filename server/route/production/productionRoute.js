const express = require("express");
const router = express.Router();
const prodictionController = require ("../../controller/production/productionController")
const { checkLogin } = require("../../middleware/token/checkLogin");

router.post("/createProduction",checkLogin, prodictionController.createProduction);
router.get("/getProduction",checkLogin, prodictionController.getAllProductions);


module.exports = router;