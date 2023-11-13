const User = require("../../../model/userModel");

const getProfileDataOfLoggedInEmployee = async (req, res) => {
  console.log(req.userId);
  console.log(req.email);
  console.log(req.authenticated);

  try {
    const existingUser = await User.find({ _id: req.userId, role: "employee" });

    // console.log(existingUser);
    if (!existingUser) {
      return res
        .status(404)
        .json({ error: "Employee with such credential doesn't exist!" });
    }

    const formattedUsers = existingUser.map((data) => ({
      userId: data._id,
      name: data.name,
      workEmail: data.email,
      phone: data.phone,
      DOB: data.DOB,
      position: data.position,
      role: data.role,
      emergencyContact: data.emergencyContact,
      startDate: data.startDate,
      endDate: data.endDate,
    }));

    // console.log(formattedUsers);
    res.status(200).json({
      data: formattedUsers,
    });
  } catch (error) {
    console.error("Error fetching users data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const togglePreferredEmail = async (req, res) => {
  try {
    console.log("togglePreferredEmail");
    console.log(req.userId);
    console.log(req.email);

    const userId = req.userId;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Toggle the preferredEmail
    if (user.preferredEmail === user.personalEmail) {
      user.preferredEmail = user.workEmail;
    } else {
      user.preferredEmail = user.personalEmail;
    }

    // Save the updated user model
    const updatedUser = await user.save();

    res.status(200).json(updatedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = { getProfileDataOfLoggedInEmployee, togglePreferredEmail };
