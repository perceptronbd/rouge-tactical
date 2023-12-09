const express = require("express");
const router = express.Router();

const authRoutes = require("./route/auth/authRoute");

const checkPermissionRoutes = require("./route/permission/checkPermissionRoute");

const employeeProfileRoutes = require("./route/employee/profile/profileRoute");

const userRoutes = require("./route/admin/user/userRoute");

const toggleEMailRoute = require("./route/employee/profile/profileRoute");

const vendorRoutes = require("./route/vendor/vendorRoute");

const adminOrderRoutes = require("./route/admin/order/orderRoute");

const employeeOrderRoutes = require("./route/employee/order/orderRoute");

const invoiceRoutes = require("./route/invoice/invoiceRoute");

const purchaseOrderRoutes = require("./route/purchaseOrder/purchaseOrderRoute");

const productionRoutes = require("./route/production/productionRoute");

const maintenanceRoutes = require("./route/maintenance/maintenanceRoute")

//all routes for payment
const paymentRoutes = require("./route/payment/paymentRoute");

//document upload
const documentUploadRoutes = require("./route/document/documentUploadRoute");
const productionDocumentUploadRoutes = require("./route/productionDocument/productionDocumentUploadRoute");

//routes for sending email to employee
const emailRoutes = require("./route/admin/email/emailRoute");

//all routes for authentication only for both admin and employee
router.use("/auth/", authRoutes);

router.use("/employee/toggleEmail", toggleEMailRoute);
//all routes for employee
router.use("/employee/profile", employeeProfileRoutes);
router.use("/employee/order", employeeOrderRoutes);

//route for permission role
router.use("/role/", checkPermissionRoutes);

//all routes for admin
router.use("/admin/user", userRoutes);
router.use("/admin/order", adminOrderRoutes);
router.use("/admin/payment", paymentRoutes);
router.use("/admin/production", productionRoutes);
router.use("/admin/maintenance", maintenanceRoutes);
router.use("/admin/email", emailRoutes);



//other routes
router.use("/vendor", vendorRoutes);
router.use("/invoice", invoiceRoutes);
router.use("/purchaseOrder", purchaseOrderRoutes);
router.use("/document", documentUploadRoutes);
router.use("/production-document", productionDocumentUploadRoutes);

module.exports = router;
