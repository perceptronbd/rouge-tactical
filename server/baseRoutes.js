const express = require("express");
const router = express.Router();

//all routes for auth
const registrationRoutes = require("./route/auth/registerRoute")
const loginRoutes = require("./route/auth/loginRoute")


//all routes for admin


//all routes for employee
router.use("/employee/auth", registrationRoutes);
router.use("/employee/auth", loginRoutes);

module.exports = router;