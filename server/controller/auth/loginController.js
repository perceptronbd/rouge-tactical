const CryptoJS = require("crypto-js");
const User = require("../../model/userModel");
const bcrypt = require("bcryptjs");
require("dotenv").config();
const { createTokens } = require("../../middleware/token/utils/createJWT");

const loginUser = async (req, res) => {
  const SECRET_KEY = process.env.SECRET_KEY;

  try {
    const { email, password } = req.body;

    // Check if the user exists with the provided preferredEmail
    const existingUser = await User.findOne({ preferredEmail: email });

    if (!existingUser) {
      // Check if the user exists with the provided personalEmail
      const personalEmail = await User.findOne({ personalEmail: email });

      if (personalEmail) {
        // Check if the personalEmail matches the provided email
        if (personalEmail.personalEmail === email) {
          return res
            .status(401)
            .json({ message: "Please provide personal email." });
        }
      }

      // Check if the user exists with the provided workEmail
      const workEmail = await User.findOne({ workEmail: email });

      if (workEmail) {
        // Check if the workEmail matches the provided email
        if (workEmail.workEmail === email) {
          return res
            .status(401)
            .json({ message: "Please provide work email." });
        }
      }

      // If none of the conditions match, the user doesn't exist
      return res
        .status(401)
        .json({ message: "User with such email doesn't exist" });
    } else {
      const hashedPassword = existingUser.password;

      // Compare the decrypted password with the stored hashed password
      bcrypt.compare(password, hashedPassword).then((match) => {
        if (!match) {
          return res
            .status(400)
            .json({ message: "Wrong Email and Password Combination!" });
        } else {
          const accessToken = createTokens(existingUser);

          // Set the access-token in the authorization header
          res.setHeader("Authorization", `Bearer ${accessToken}`);

          return res.status(200).json({
            token: accessToken,
            userData: existingUser,
            message: "User logged In successfully",
          });
        }
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  loginUser,
};
