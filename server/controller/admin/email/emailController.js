const nodemailer = require("nodemailer");
require("dotenv").config();
const User = require("../../../model/userModel");
const PermitEmail = require("../../../model/permitEmailModel");
const MaintenanceEmail = require("../../../model/maintenanceEmailModel");
const Order = require("../../../model/orderModel");

const sendPermitMail = async (req, res) => {
  try {
    // Create a transporter for sending emails
    let transporter = await nodemailer.createTransport({
      service: "gmail",
      port: 587,
      auth: {
        user: process.env.SENDER_EMAIL,
        pass: process.env.SENDER_PASSWORD,
      },
    });

    // Find all notifications with send = false
    const notifications = await PermitEmail.find({
      send: false,
    });

    // Process each notification
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
      const renewalDeadline = new Date(notification.renewalDeadline); // Assuming renewalDeadline is a Date object
      const priorDeadline = notification.priorDeadline; // Assuming priorDeadline is in days
      const permit = notification.permit;

      // Calculate the target date by subtracting priorDeadline days from renewalDeadline
      const targetDate = new Date(renewalDeadline);
      targetDate.setDate(targetDate.getDate() - priorDeadline);

      // Get today's date
      const today = new Date();

      // Check if the targetDate matches the current date (ignoring time)
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
        // Log that the email was not sent today
        console.log(`Notification for admin ${name} was not sent today`);
      }
    }

    res.json({ message: "Mail Sent" });
  } catch (error) {
    console.error("Error occurred while sending email:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const sendMaintenanceEmail = async (req, res) => {
  try {
    // Create a transporter for sending emails
    let transporter = await nodemailer.createTransport({
      service: "gmail",
      port: 587,
      auth: {
        user: process.env.SENDER_EMAIL,
        pass: process.env.SENDER_PASSWORD,
      },
    });

    // Find all notifications with send = false
    const notifications = await MaintenanceEmail.find({
      send: false,
    });

    // Process each notification
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

      // Check if the targetDate matches the current date (ignoring time)
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
        // Log that the email was not sent today
        console.log(`Notification for admin ${name} was not sent today`);
      }
    }

    res.json({ message: "Mail Sent" });
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

    res.json({
      code: 200,
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

    res.json({
      code: 200,
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

    const { to, item, size, quantity } = req.body;

    const existingUser = await User.findOne({ _id: req.userId });

    if (!existingUser) {
      return res.status(404).json({ error: "User not found" });
    }

    const role = existingUser.role;
    const workEmail = existingUser.workEmail;
    const username = existingUser.name;
    const userId = existingUser._id;

    console.log(role, workEmail);

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
      to: workEmail,
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

    console.log(`Mail send to ${workEmail} for admin ${username}`);
    res.json({
      code: 200,
      data: {
        user_id: userId,
        username: username,
        email: to,
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
  sendOrderListMail,
};
