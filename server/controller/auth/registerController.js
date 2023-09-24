const CryptoJS = require("crypto-js");
const User = require("../../model/userModel");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const createUser = async (req, res) => {
  const SECRET_KEY = process.env.SECRET_KEY;

  try {
    const {
      name,
      phone,
      email,
      DOB,
      position,
      password,
      role,
      emergencyContact,
      startDate,
      endDate,
    } = req.body;

    const existingUser = await User.findOne({ email });
    var bytes = CryptoJS.AES.decrypt(password, SECRET_KEY);
    var decryptedPassword = bytes.toString(CryptoJS.enc.Utf8);
    console.log(decryptedPassword);


    // Check if a user with the same email or employee ID already exists

    if (existingUser) {
      res.status(400).json({ message: "User with this email already exists" });
    } else {
      const hashedPassword = await bcrypt.hash(decryptedPassword, 10);

      const newUser = new User({
        name: name,
        email: email,
        password: hashedPassword,
        phone: phone,
        DOB: DOB,
        position: position,
        role: role,
        emergencyContact: emergencyContact,
        startDate: startDate,
        endDate: endDate,
      });

      // Save the new user to the database
      await newUser.save();
      console.log(newUser);

      res.json({
        code: 200,
          data: {
          userId: newUser._id,
          name: newUser.name,
          email: newUser.email,
          phone: newUser.phone,
          DOB: newUser.DOB,
          position: newUser.position,
          role: newUser.role,
          emergencyContact: newUser.emergencyContact,
          startDate: newUser.startDate,
          endDate: newUser.endDate,
        },
        message: "User registered successfully",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  createUser,
};
