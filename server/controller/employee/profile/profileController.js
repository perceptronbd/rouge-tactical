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
    res.json({
      code: 200,
      data: {
        employeeProfileData: formattedUsers,
      },
    });
  } catch (error) {
    console.error("Error fetching users data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { getProfileDataOfLoggedInEmployee };
