const nodemailer = require("nodemailer");
require("dotenv").config();
const User = require("../../../model/userModel");
const PermitEmail = require("../../../model/permitEmailModel");
const MaintenanceEmail = require("../../../model/maintenanceEmailModel");
const OrderEmail = require("../../../model/orderEmailModel");
const Order = require("../../../model/orderModel");

const sendPermitMail = async (req, res) => {
  try {
    let transporter = await nodemailer.createTransport({
      service: "gmail",
      port: 587,
      auth: {
        user: process.env.SENDER_EMAIL,
        pass: process.env.SENDER_PASSWORD,
      },
    });

    const notifications = await PermitEmail.find({
      send: false,
    });

    for (const notification of notifications) {
      const userId = notification.notifyAdmin.userId;
      if (!userId) {
        console.log(
          "Admin user not found or recipient not found in receiver list for notification:",
          notification._id
        );
        continue;
      }

      const adminUser = await User.findById(userId);
      if (!adminUser) {
        console.log("Admin user not found for ID:", userId);
        continue;
      }

      const workEmail = adminUser.workEmail;
      const name = adminUser.name;
      const notes = notification.notes;
      const renewalDeadline = new Date(notification.renewalDeadline);
      const priorDeadline = notification.priorDeadline;
      const permit = notification.permit;

      // Calculate the target date by subtracting priorDeadline days from renewalDeadline
      const targetDate = new Date(renewalDeadline);
      targetDate.setDate(targetDate.getDate() - priorDeadline);

      // Get today's date
      const today = new Date();

      // Check if the targetDate matches the current date
      if (
        targetDate.getFullYear() === today.getFullYear() &&
        targetDate.getMonth() === today.getMonth() &&
        targetDate.getDate() === today.getDate()
      ) {
        let info = await transporter.sendMail({
          from: process.env.SENDER_EMAIL,
          to: workEmail,
          subject: "Notification from Rouge-Tactical",
          html: `<table style="background-color:#f5f5f5;width:100%;max-width:600px;margin:0 auto;font-family:Arial, sans-serif;font-size:16px;line-height:1.4;color:#333;">
            <tr>
              <td style="padding:20px;">
                <h3 style="font-weight:600;margin-bottom:20px;">
                  <span style="color:rgb(0,176,224);margin-top:0">Rouge-Tactical</span>
                </h3>
                <h2 style="margin-bottom:10px;"><b> Permit Record </b></h2>
                <p style="margin-bottom:10px;">Hello ${name},</p>
                <p style="margin-bottom:10px;"><b>${notes}</b></p>
                <p style="margin-bottom:10px;">   Permit :${permit}</p>
                <p style="margin-bottom:10px;">   Renewal Deadline : ${
                  renewalDeadline.toISOString().split("T")[0]
                }</p>
          
                <p style="text-align: center; margin-top: 50px; font-size: 12px;">Powered by &copy; PerceptronBD Ltd.</p>
              </td>
            </tr>
          </table>`,
        });

        notification.send = true;
        await notification.save();

        console.log(`Mail sent to ${workEmail} for admin ${name}`);
      } else {
        console.log(`Notification for admin ${name} was not sent today`);
      }
    }

    res.status(200).json({ message: "Mail Sent" });
  } catch (error) {
    console.error("Error occurred while sending email:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const sendMaintenanceEmail = async (req, res) => {
  try {
    let transporter = await nodemailer.createTransport({
      service: "gmail",
      port: 587,
      auth: {
        user: process.env.SENDER_EMAIL,
        pass: process.env.SENDER_PASSWORD,
      },
    });

    const notifications = await MaintenanceEmail.find({
      send: false,
    });

    for (const notification of notifications) {
      const userId = notification.notifyAdmin.userId;
      if (!userId) {
        console.log(
          "Admin user not found or recipient not found in receiver list for notification:",
          notification._id
        );
        continue;
      }

      const adminUser = await User.findById(userId);
      if (!adminUser) {
        console.log("Admin user not found for ID:", userId);
        continue;
      }

      const workEmail = adminUser.workEmail;
      const name = adminUser.name;
      const machine = notification.machine;
      const condition = notification.condition;
      const location = notification.location;
      const assignedTo = notification.assignedTo;
      const status = notification.status;
      const notes = notification.notes;
      const nextMaintenanceDate = notification.nextMaintenanceDate;
      const priorDeadline = notification.priorDeadline;

      // Calculate the target date by subtracting priorDeadline days from renewalDeadline
      const targetDate = new Date(nextMaintenanceDate);
      targetDate.setDate(targetDate.getDate() - priorDeadline);

      // Get today's date
      const today = new Date();

      // Check if the targetDate matches the current date
      if (
        targetDate.getFullYear() === today.getFullYear() &&
        targetDate.getMonth() === today.getMonth() &&
        targetDate.getDate() === today.getDate()
      ) {
        // Send the email
        let info = await transporter.sendMail({
          from: process.env.SENDER_EMAIL,
          to: workEmail,
          subject: "Notification from Rouge-Tactical",
          html: `<table style="background-color:#f5f5f5;width:100%;max-width:600px;margin:0 auto;font-family:Arial, sans-serif;font-size:16px;line-height:1.4;color:#333;">
            <tr>
              <td style="padding:20px;">
                <h3 style="font-weight:600;margin-bottom:20px;">
                  <span style="color:rgb(0,176,224);margin-top:0">Rouge-Tactical</span>
                </h3>
                <h2 style="margin-bottom:10px;"><b> Maintenance Record :</b></h2>
                <p style="margin-bottom:10px;">Hello ${name},</p>
                <p style="margin-bottom:10px;"><b>${notes}</b></p>
                <p style="margin-bottom:10px;">  Assigned To :${assignedTo}</p>
                <p style="margin-bottom:10px;">  Machine :${machine}</p>
                <p style="margin-bottom:10px;">  Location :${location}</p>
                <p style="margin-bottom:10px;">  Condition :${condition}</p>
                 <p style="margin-bottom:10px;"> Status :${status}</p>
                <p style="margin-bottom:10px;">  Next Maintenance Date : ${
                  nextMaintenanceDate.toISOString().split("T")[0]
                }</p>
          
                <p style="text-align: center; margin-top: 50px; font-size: 12px;">Powered by &copy; PerceptronBD Ltd.</p>
              </td>
            </tr>
          </table>`,
        });

        notification.send = true;
        await notification.save();

        console.log(`Mail sent to ${workEmail} for admin ${name}`);
      } else {
        console.log(`Notification for admin ${name} was not sent today`);
      }
    }

    res.status(200).json({ message: "Mail Sent" });
  } catch (error) {
    console.error("Error occurred while sending email:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const setPermitEmailCredentials = async (req, res) => {
  const {
    adminID,
    permit,
    notes,
    expirationDate,
    renewalDeadline,
    priorDeadline,
  } = req.body;

  try {
    console.log(adminID);
    const existingUser = await User.findOne({ _id: adminID });

    const userWorkEmail = existingUser.workEmail;

    console.log(userWorkEmail);
    if (!existingUser) {
      return res.status(404).json({ error: "No User found" });
    }

    const permitEmailData = {
      notifyAdmin: {
        userId: adminID,
      },
      userWorkEmail: userWorkEmail,
      expirationDate: expirationDate,
      permit: permit,
      notes: notes,
      priorDeadline: priorDeadline,
      renewalDeadline: renewalDeadline,
      send: false,
    };

    const permitEmail = new PermitEmail(permitEmailData);

    await permitEmail.save();

    res.status(200).json({
      data: {
        permit: permit,
        uerWorkEmail: userWorkEmail,
        notes: notes,
        priorDeadline: priorDeadline,
        renewalDeadline: renewalDeadline,
        expirationDate: expirationDate,
        send: false,
      },
    });
  } catch (error) {
    console.error("Error creating permit email credentials:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const setMaintenanceEmailCredentials = async (req, res) => {
  const {
    adminID,
    machine,
    nextMaintenanceDate,
    notes,
    assignedTo,
    condition,
    location,
    priorDeadline,
  } = req.body;

  try {
    console.log(adminID);
    const existingUser = await User.findOne({ _id: adminID });

    const userWorkEmail = existingUser.workEmail;

    console.log(userWorkEmail);
    if (!existingUser) {
      return res.status(404).json({ error: "No User found" });
    }

    const maintenanceEmailData = {
      notifyAdmin: {
        userId: adminID,
      },
      userWorkEmail: userWorkEmail,
      machine: machine,
      nextMaintenanceDate: nextMaintenanceDate,
      notes: notes,
      assignedTo: assignedTo,
      condition: condition,
      location: location,
      priorDeadline: priorDeadline,
      send: false,
    };

    const maintenanceEmail = new MaintenanceEmail(maintenanceEmailData);

    await maintenanceEmail.save();

    res.status(200).json({
      data: {
        userWorkEmail: userWorkEmail,
        machine: machine,
        nextMaintenanceDate: nextMaintenanceDate,
        notes: notes,
        assignedTo: assignedTo,
        condition: condition,
        location: location,
        priorDeadline: priorDeadline,
        send: false,
      },
    });
  } catch (error) {
    console.error("Error creating notifying admin email credentials:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const setRecipientAdmin = async (req, res) => {
  const { selectedAdminID } = req.body;

  try {
    console.log(selectedAdminID);
    const existingAdmin = await User.findOne({ _id: selectedAdminID });

    if (!existingAdmin) {
      return res.status(404).json({
        code: 404,
        message: "Admin not found",
      });
    }

    const adminName = existingAdmin.name;
    console.log(adminName);

    await OrderEmail.deleteMany({});

    const newOrderEmail = new OrderEmail({
      selectedAdminID,
      adminName,
    });

    await newOrderEmail.save();

    res.status(200).json({
      message: "New Admin has been added as RECIPIENT ",
      data: {
        selectedAdminID: selectedAdminID,
        selectAdminName: adminName,
      },
    });
  } catch (error) {
    console.error("Error in setting admin:", error);
    res.status(500).json({ code: 500, error: "Internal server error" });
  }
};

const sendOrderListMail = async (req, res) => {
  try {
    let transporter = await nodemailer.createTransport({
      service: "gmail",
      port: 587,
      auth: {
        user: process.env.SENDER_EMAIL,
        pass: process.env.SENDER_PASSWORD,
      },
    });

    const { item, size, quantity } = req.body;

    const existingUser = await User.findOne({ _id: req.userId });
    const OrderEmailInfo = await OrderEmail.find({});
    console.log(OrderEmailInfo);
    const selectedAdminID = OrderEmailInfo[0].selectedAdminID;

    const selectedAdminInfo = await User.findOne({ _id: selectedAdminID });
    console.log(selectedAdminInfo);
    const selectedAdminWorkEmail = selectedAdminInfo.workEmail;
    console.log(selectedAdminWorkEmail);

    if (!existingUser) {
      return res.status(404).json({ error: "User not found" });
    }

    const username = selectedAdminInfo.name;
    const userId = selectedAdminInfo._id;

    const matchingOrders = await Order.find({
      item: item,
      quantity: quantity,
      size: size,
    }).populate("createdBy", "name");

    if (matchingOrders.length === 0) {
      console.log("No matching orders found.");
    } else {
      console.log("Order List:");
      console.log(matchingOrders);
    }

    let orderTable =
      '<table style="border-collapse: collapse; width:100%; max-width:600px; margin:0 auto; font-family: Arial, sans-serif; font-size: 16px; line-height: 1.4; color: #333;">';
    orderTable += "<tr>";
    orderTable += '<th style="border: 1px solid #ddd; padding: 8px;">Item</th>';
    orderTable += '<th style="border: 1px solid #ddd; padding: 8px;">Size</th>';
    orderTable +=
      '<th style="border: 1px solid #ddd; padding: 8px;">Quantity</th>';
    orderTable +=
      '<th style="border: 1px solid #ddd; padding: 8px;">Created By</th>';
    orderTable += "</tr>";

    matchingOrders.forEach((order) => {
      orderTable += "<tr>";
      orderTable += `<td style="border: 1px solid #ddd; padding: 8px;">${order.item}</td>`;
      orderTable += `<td style="border: 1px solid #ddd; padding: 8px;">${order.size}</td>`;
      orderTable += `<td style="border: 1px solid #ddd; padding: 8px;">${order.quantity}</td>`;
      orderTable += `<td style="border: 1px solid #ddd; padding: 8px;">${order.createdBy.name}</td>`;
      orderTable += "</tr>";
    });

    orderTable += "</table>";

    let info = await transporter.sendMail({
      from: process.env.SENDER_EMAIL,
      to: selectedAdminWorkEmail,
      subject: "Notification from Rouge-Tactical",
      html: `<table style="background-color:#f5f5f5;width:100%;max-width:600px;margin:0 auto;font-family:Arial, sans-serif;font-size:16px;line-height:1.4;color:#333;">
          <tr>
            <td style="padding:20px;">
              <h3 style="font-weight:600;margin-bottom:20px;">
                <span style="color:rgb(0,176,224);margin-top:0">Rouge-Tactical</span>
              </h3>
              <p style="margin-bottom:10px;">Hello Admin, ${username},</p>
              <p style="margin-bottom:10px;"><b> Order List:</b></p>
              ${orderTable}
              <p style="text-align: center; margin-top: 50px; font-size: 12px;">Powered by &copy; PerceptronBD Ltd.</p>
            </td>
          </tr>
        </table>`,
    });

    console.log(`Mail send to ${selectedAdminWorkEmail} for admin ${username}`);
    res.status(200).json({
      data: {
        user_id: userId,
        username: username,
        email: selectedAdminWorkEmail,
      },
      message: "Mail Sent To Admin",
    });
  } catch (error) {
    console.error("Error occurred while sending email:", error);
    throw error;
  }
};

module.exports = {
  sendPermitMail,
  sendMaintenanceEmail,
  setPermitEmailCredentials,
  setMaintenanceEmailCredentials,
  setRecipientAdmin,
  sendOrderListMail,
};
