const User = require("../../../model/userModel");
const CryptoJS = require("crypto-js");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const getProfileDataOfAllExistingUser = async (req, res) => {
  try {
    const existingUser = await User.find();

    // console.log(existingUser);
    if (!existingUser) {
      return res.status(404).json({ error: "No User found" });
    }

    const formattedUsers = existingUser.map((data) => ({
      userId: data._id,
      name: data.name,
      personalEmail: data.personalEmail,
      workEmail: data.workEmail,
      preferredEmail: data.preferredEmail,
      phone: data.phone,
      DOB: data.DOB,
      position: data.position,
      role: data.role,
      emergencyContact: data.emergencyContact,
      startDate: data.startDate,
      endDate: data.endDate,
    }));
    res.status(200).json({
      data: formattedUsers,
    });
  } catch (error) {
    console.error("Error fetching users data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const addEmployee = async (req, res) => {
  const SECRET_KEY = process.env.SECRET_KEY;

  try {
    const {
      name,
      phone,
      workEmail,
      personalEmail,
      preferredEmail,
      password,
      DOB,
      position,
      role,
      emergencyContact,
      address,
      startDate,
      endDate,
    } = req.body;

    console.log(req.userId);

    const existingUser = await User.findOne({ _id: req.userId, role: "admin" });
    const existingEmployee = await User.findOne({
      $or: [{ workEmail: workEmail }, { personalEmail: personalEmail }],
    });

    console.log(existingUser);
    console.log(existingEmployee);

    if (existingEmployee) {
      if (existingEmployee.workEmail === workEmail) {
        res.status(400).json({
          message:
            "Employee with such Organization email already exists! Please try with different Organization email",
        });
      } else if (existingEmployee.personalEmail === personalEmail) {
        res.status(400).json({
          message:
            "Employee with such Personal email already exists! Please try with different Personal email",
        });
      }
      return;
    }
    var bytes = CryptoJS.AES.decrypt(password, SECRET_KEY);
    var decryptedPassword = bytes.toString(CryptoJS.enc.Utf8);
    console.log(decryptedPassword);

    if (!existingUser) {
      res
        .status(400)
        .json({ message: "Admin with such credential doesn't exist!" });
    } else {
      const hashedPassword = await bcrypt.hash(decryptedPassword, 10);
      const newEmployee = new User({
        name: name,
        workEmail: workEmail,
        personalEmail: personalEmail,
        preferredEmail: preferredEmail,
        password: hashedPassword,
        phone: phone,
        DOB: DOB,
        position: position,
        role: role,
        emergencyContact: emergencyContact,
        address: address,
        startDate: startDate,
        endDate: endDate,
      });

      // Save the new user to the database
      await newEmployee.save();
      console.log(newEmployee);

      res.json({
        code: 200,
        data: {
          userId: newEmployee._id,
          name: newEmployee.name,
          workEmail: newEmployee.email,
          personalEmail: newEmployee.personalEmail,
          preferredEmail: newEmployee.preferredEmail,
          phone: newEmployee.phone,
          DOB: newEmployee.DOB,
          position: newEmployee.position,
          role: newEmployee.role,
          emergencyContact: newEmployee.emergencyContact,
          address: address,
          startDate: newEmployee.startDate,
          endDate: newEmployee.endDate,
        },
        message: "New Employee added successfully",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  getProfileDataOfAllExistingUser,
  addEmployee,
};
