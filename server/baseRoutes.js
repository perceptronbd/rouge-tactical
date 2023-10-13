const express = require("express");
const router = express.Router();

//import routes for auth
const registrationRoutes = require("./route/auth/registerRoute");
const loginRoutes = require("./route/auth/loginRoute");

//import routes for check permission
const checkPermissionRoutes = require("./route/permission/checkPermissionRoute");

//import routes for employee
const employeeProfileRoutes = require("./route/employee/profile/profileRoute");

//import routes for admin
const userRoutes = require("./route/admin/user/userRoute");

//all routes for vendor
const vendorRoutes = require("./route/vendor/vendorRoute")

//all routes for order
const orderRoutes = require("./route/order/orderRoute")

//all routes for invoice
const invoiceRoutes = require("./route/invoice/invoiceRoute")

//all routes for purchaseOrder
const purchaseOrderRoutes = require("./route/purchaseOrder/purchaseOrderRoute")


//all routes for authentication only for both admin and employee
router.use("/employee/auth", registrationRoutes);
router.use("/employee/auth", loginRoutes);

//all routes for employee
router.use("/employee/profile", employeeProfileRoutes);
router.use("/employee/order", orderRoutes);


//route for permission role
router.use("/role/", checkPermissionRoutes);

//all routes for admin
router.use("/admin/user", userRoutes);
router.use("/admin/order", orderRoutes);



//other routes
router.use("/vendor", vendorRoutes);
router.use("/invoice", invoiceRoutes);
router.use("/purchaseOrder", purchaseOrderRoutes);


module.exports = router;
