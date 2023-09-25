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

//all routes for employee
router.use("/employee/auth", registrationRoutes);
router.use("/employee/auth", loginRoutes);
router.use("/employee/profile", employeeProfileRoutes);

//route for permission role
router.use("/role/", checkPermissionRoutes);

//all routes for admin
router.use("/admin/user", userRoutes);

module.exports = router;
