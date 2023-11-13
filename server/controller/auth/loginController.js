const CryptoJS = require("crypto-js");
const User = require("../../model/userModel");
const bcrypt = require("bcryptjs");
require("dotenv").config();
const { createTokens } = require("../../middleware/token/utils/createJWT");

const loginUser = async (req, res) => {
  const SECRET_KEY = process.env.SECRET_KEY;

  try {
    const { email, password } = req.body;

    // Decrypt the password from the request body

    const existingUser = await User.findOne({ preferredEmail: email });
    console.log("existingUser", existingUser);

    if (!existingUser) {
      res.status(401).json({ message: "User with such email doesn't exist" });
    } else {
      const hashedPassword = existingUser.password;

      // Compare the decrypted password with the stored hashed password
      bcrypt.compare(password, hashedPassword).then((match) => {
        if (!match) {
          res
            .status(400)
            .json({ message: "Wrong Email and Password Combination!" });
        } else {
          const accessToken = createTokens(existingUser);

          // Set the access-token in the authorization header
          res.setHeader("Authorization", `Bearer ${accessToken}`);

          res.status(200).json({
            token: accessToken,
            userData: existingUser,
            message: "User logged In successfully",
          });
        }
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  loginUser,
};
