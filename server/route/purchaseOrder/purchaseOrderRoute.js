const express = require("express");
const router = express.Router();
const purchaseOrderController = require("../../controller/purchaseOrder/purchaseOrderController");
const { checkLogin } = require("../../middleware/token/checkLogin");

router.post(
  "/createPurchaseOrder",
  checkLogin,
  purchaseOrderController.createPurchaseOrder
);
router.get(
  "/getAllPurchaseOrder",
  checkLogin,
  purchaseOrderController.getAllPurchaseOrder
);
router.get(
  "/getPurchaseOrderOfSelectedVendor",
  checkLogin,
  purchaseOrderController.getPurchaseOrderOfSelectedVendor
);
router.put(
  "/updatePurchaseOrder",
  checkLogin,
  purchaseOrderController.updatePurchaseOrder
);
router.put(
  "/deletePurchaseOrder",
  checkLogin,
  purchaseOrderController.deletePurchaseOrder
);

module.exports = router;
