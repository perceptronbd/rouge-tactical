const { sign } = require("jsonwebtoken");
require("dotenv").config();

const createTokens = (user) => {
  const { email, _id } = user;
  console.log("ged" + email);
  console.log("ged" + _id);
  const accessToken = sign(
    { email: email, userId: _id },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );

  return accessToken;
};

module.exports = { createTokens };
