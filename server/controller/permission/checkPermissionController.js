const CryptoJS = require("crypto-js");
const User = require("../../model/userModel");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const checkRolePermission = async (req, res) => {
  try {

      console.log("checking permission")
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  checkRolePermission,
};