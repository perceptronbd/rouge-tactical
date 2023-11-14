const User = require("../../model/userModel");
const { verify } = require("jsonwebtoken");
require("dotenv").config();

const findUserByEmail = (email) => {
  return User.findOne({ email });
};

const authRole = (allowedRoles) => {
  return (req, res, next) => {
    const { authorization } = req.headers;
    const accessToken = authorization.split(" ")[1];

    verify(accessToken, process.env.JWT_SECRET, async (err, decodedToken) => {
      if (err) {
        console.log("Error verifying token:", err);
        res.status(403).json({
          code: 403,
          data: {
            message: " Token verification failed",
          },
        });
        return;
      }

      const { email } = decodedToken;
      const existingUser = await findUserByEmail(email);

      if (!existingUser) {
        console.log("User not found");
        res.status(403).json({
          code: 403,
          data: {
            message: " User not found",
          },
        });
        return;
      }

      const userRole = existingUser.role;

      if (allowedRoles.includes(userRole)) {
        res.status(200).json({
          code: 200,

          data: {
            role: userRole,
            message: "You have access to this path!",
          },
        });
        next();
      } else {
        res.status(403).json({
          code: 403,
          data: {
            role: userRole,
            message: "Forbidden route: You don't have access to this path!",
          },
        });
      }
    });
  };
};

module.exports = { authRole };
