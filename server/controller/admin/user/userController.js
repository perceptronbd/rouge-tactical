const CryptoJS = require("crypto-js");
const User = require("../../../model/userModel");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const getProfileDataOfAllExistingUser = async (req, res) => {
//   console.log(req.userId);
//   console.log(req.email);
//   console.log(req.authenticated);

  try {
    const existingUser = await User.find();

    // console.log(existingUser);
    if (!existingUser) {
      return res.status(404).json({ error: "No User found" });
    }

    const formattedUsers = existingUser.map((data) => ({
      userId: data._id,
      name: data.name,
      email: data.email,
      phone: data.phone,
      DOB: data.DOB,
      position: data.position,
      role: data.role,
      emergencyContact: data.emergencyContact,
      startDate: data.startDate,
      endDate: data.endDate,
    }));
    res.json({
      code: 200,
      data: {
        allUserProfileData: formattedUsers,
      },
    });
  } catch (error) {
    console.error("Error fetching users data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { getProfileDataOfAllExistingUser };
