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
      address: data.address,
      role: data.role,
      emergencyContact: data.emergencyContact,
      startDate: data.startDate,
      endDate: data.endDate,
    }));
    res.status(200).json({
      userId: req.userId,
      data: formattedUsers,
    });
  } catch (error) {
    console.error("Error fetching users data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getAllExistingAdminData = async (req, res) => {
  try {
    const existingAdmins = await User.find({ role: "admin" });

    if (existingAdmins.length === 0) {
      return res.status(404).json({ error: "No Admin User found" });
    }

    const formattedAdmins = existingAdmins.map((data) => ({
      userId: data._id,
      name: data.name,
      workEmail: data.workEmail,
      phone: data.phone,
      role: data.role,
    }));

    res.status(200).json({
      userId: req.userId,
      data: formattedAdmins,
    });
  } catch (error) {
    console.error("Error fetching admin users data:", error);
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
          message: "Provided Work Email is already registered!",
        });
      } else if (existingEmployee.personalEmail === personalEmail) {
        res.status(400).json({
          message: "Provided Personal Email is already registered!",
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
        preferredEmail: workEmail,
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

      res.status(200).json({
        userId: req.userId,
        data: newEmployee,
        message: "New Employee added successfully",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const updateEmployee = async (req, res) => {
  const userId = req.params.userId;
  const {
    name,
    phone,
    personalEmail,
    workEmail,
    preferredEmail,
    DOB,
    position,
    role,
    emergencyContact,
    address,
    startDate,
    endDate,
  } = req.body;

  try {
    const existingUser = await User.findById(userId);

    if (!existingUser) {
      return res.status(404).json({ message: "User not found" });
    }

    if (name != null && name !== "") {
      existingUser.name = name;
    }
    if (phone != null && phone !== "") {
      existingUser.phone = phone;
    }
    if (personalEmail != null && personalEmail !== "") {
      existingUser.personalEmail = personalEmail;
    }
    if (workEmail != null && workEmail !== "") {
      existingUser.workEmail = workEmail;
    }
    if (preferredEmail != null && preferredEmail !== "") {
      existingUser.preferredEmail = preferredEmail;
    }
    if (DOB != null && DOB !== "") {
      existingUser.DOB = DOB;
    }
    if (position != null && position !== "") {
      existingUser.position = position;
    }
    if (role != null && role !== "") {
      existingUser.role = role;
    }
    if (emergencyContact != null) {
      existingUser.emergencyContact = {
        name: emergencyContact.name || existingUser.emergencyContact.name,
        phone: emergencyContact.phone || existingUser.emergencyContact.phone,
      };
    }
    if (address != null && address !== "") {
      existingUser.address = address;
    }
    if (startDate != null && startDate !== "") {
      existingUser.startDate = startDate;
    }
    if (endDate != null && endDate !== "") {
      existingUser.endDate = endDate;
    }

    existingUser.updatedAt = new Date();

    const updatedUser = await existingUser.save();

    return res.status(200).json({
      userId: req.userId,
      data: updatedUser,
      message: "User updated successfully",
    });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const deleteEmployee = async (req, res) => {
  const userId = req.params.userId;

  try {
    const deletedUser = await User.findByIdAndRemove(userId);

    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({
      message: "User deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  getProfileDataOfAllExistingUser,
  addEmployee,
  updateEmployee,
  deleteEmployee,
  getAllExistingAdminData,
};
