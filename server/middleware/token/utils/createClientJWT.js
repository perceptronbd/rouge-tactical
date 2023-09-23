const { sign } = require("jsonwebtoken");
require("dotenv").config();

const createTokens = (user) => {
  const { email, userId } = user;
  // console.log("ged" + email);
  // console.log("ged" + userId);
  const accessToken = sign(
    { email: email, userId: userId },
    process.env.JWT_SECRET,
    { expiresIn: "30d" }
  );

  return accessToken;
};

module.exports = { createTokens };
