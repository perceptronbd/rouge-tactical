const express = require("express");
const router = express.Router();

//import routes for auth
const registrationRoutes = require("./route/auth/registerRoute");
const loginRoutes = require("./route/auth/loginRoute");
//import routes for check permission
const checkPermissionRoutes = require("./route/permission/checkPermissionRoute");

//import routes for employee
const employeeProfileRoutes = require("./route/employee/profile/profileRoute");
const employeeOrderRoutes = require("./route/employee/order/employeeOrderRoute")
const employeeVendorRoutes = require("./route/employee/vendor/employeeVendorRoute")

//import routes for admin
const userRoutes = require("./route/admin/user/userRoute");
const adminOrderRoutes = require("./route/admin/order/adminOrderRoute")
const adminVendorRoutes = require("./route/admin/vendor/adminVendorRoute")
//all routes for authentication only for both admin and employee
router.use("/employee/auth", registrationRoutes);
router.use("/employee/auth", loginRoutes);

//all routes for employee
router.use("/employee/profile", employeeProfileRoutes);
router.use("/employee/order", employeeOrderRoutes);
router.use("/employee/vendor", employeeVendorRoutes);

//route for permission role
router.use("/role/", checkPermissionRoutes);

//all routes for admin
router.use("/admin/user", userRoutes);
router.use("/admin/order", adminOrderRoutes);
router.use("/admin/vendor", adminVendorRoutes);

module.exports = router;
