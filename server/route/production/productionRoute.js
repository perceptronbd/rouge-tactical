const express = require("express");
const router = express.Router();
const prodictionController = require("../../controller/production/productionController");
const { checkLogin } = require("../../middleware/token/checkLogin");

router.post(
  "/createProduction",
  checkLogin,
  prodictionController.createProduction
);
router.get(
  "/getProduction",
  checkLogin,
  prodictionController.getAllProductions
);
router.put(
  "/updateProduction",
  checkLogin,
  prodictionController.updateProduction
);
router.delete(
  "/deleteProduction/:productionId",
  checkLogin,
  prodictionController.deleteProduction
);

module.exports = router;
