const nodemailer = require("nodemailer");
require("dotenv").config();
const User = require("../../../model/userModel");
const PermitEmail = require("../../../model/permitEmailModel");
const NotifyAdminEmail = require("../../../model/notifyAdminEmailModel");
const Order = require("../../../model/orderModel")

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

    // Get today's date as a string in the format "yyyy-mm-dd"
    const today = new Date().toISOString().split("T")[0];
    console.log(today);

    // Find all notifications with renewalDeadline today and send = false
    const notifications = await PermitEmail.find({
      renewalDeadline: today,
      send: false,
    });

    console.log(notifications);

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
      const notes = notification.notes; // Get notes from the notification
      const renewalDeadline = notification.renewalDeadline; // Get renewalDeadline from the notification

      // Send email
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
              <p style="margin-bottom:10px;">Hello ${name},</p>
              <p style="margin-bottom:10px;"><b>${notes}</b></p>
              <p style="margin-bottom:10px;">This is your warning! Your deadline is ${renewalDeadline}</p>
          
              <p style="text-align: center; margin-top: 50px; font-size: 12px;">Powered by &copy; PerceptronBD Ltd.</p>
            </td>
          </tr>
        </table>`,
      });

      // Update the notification to indicate the email was sent and set send to true
      notification.send = true;
      await notification.save();

      // Log the result
      console.log(`Mail sent to ${workEmail} for admin ${name}`);
    }

    res.json({ message: "Mail Sent" });
  } catch (error) {
    console.error("Error occurred while sending email:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const sendNotifyAdminMail = async (req, res) => {
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

    // Get today's date as a string in the format "yyyy-mm-dd"
    const today = new Date().toISOString().split("T")[0];
    console.log(today);

    // Find all notifications with renewalDeadline today and send = false
    const notifications = await NotifyAdminEmail.find({
      renewalDeadline: today,
      send: false,
    });

    console.log(notifications);

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
      const renewalDeadline = notification.renewalDeadline; 

      // Send email
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
              <p style="margin-bottom:10px;">Hello ${name},</p>
              <p style="margin-bottom:10px;"><b>Machine: ${machine}</b></p>
              <p style="margin-bottom:10px;">This is your warning! Your deadline is ${renewalDeadline}</p>
          
              <p style="text-align: center; margin-top: 50px; font-size: 12px;">Powered by &copy; PerceptronBD Ltd.</p>
            </td>
          </tr>
        </table>`,
      });

      // Update the notification to indicate the email was sent and set send to true
      notification.send = true;
      await notification.save();

      // Log the result
      console.log(`Mail sent to ${workEmail} for admin ${name}`);
    }

    res.json({ message: "Mail Sent" });
  } catch (error) {
    console.error("Error occurred while sending email:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const setPermitEmailCredentials = async (req, res) => {
  const { adminID, permit, notes, renewalDeadline } = req.body;

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
      permit: permit,
      notes: notes,
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
        renewalDeadline: renewalDeadline,
        send: false,
      },
    });
  } catch (error) {
    console.error("Error creating permit email credentials:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const setAdminNotifyEmailCredentials = async (req, res) => {
  const { adminID, machine, renewalDeadline } = req.body;

  try {
    console.log(adminID);
    const existingUser = await User.findOne({ _id: adminID });

    const userWorkEmail = existingUser.workEmail;

    console.log(userWorkEmail);
    if (!existingUser) {
      return res.status(404).json({ error: "No User found" });
    }

    const notifyAdminEmailData = {
      notifyAdmin: {
        userId: adminID,
      },
      userWorkEmail: userWorkEmail,
      machine: machine,
      renewalDeadline: renewalDeadline,
      send: false,
    };

    const notifyAdminEmail = new NotifyAdminEmail(notifyAdminEmailData);

    await notifyAdminEmail.save();

    res.json({
      code: 200,
      data: {
        notifyAdminEmail: notifyAdminEmail,
        uerWorkEmail: userWorkEmail,
        machine: machine,
        renewalDeadline: renewalDeadline,
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
    }).populate('createdBy', 'name');

    if (matchingOrders.length === 0) {
      
      console.log("No matching orders found.");
    } else {
     
      console.log("Order List:");
      console.log(matchingOrders);
    }

    
    let orderTable = '<table style="border-collapse: collapse; width:100%; max-width:600px; margin:0 auto; font-family: Arial, sans-serif; font-size: 16px; line-height: 1.4; color: #333;">';
    orderTable += '<tr>';
    orderTable += '<th style="border: 1px solid #ddd; padding: 8px;">Item</th>';
    orderTable += '<th style="border: 1px solid #ddd; padding: 8px;">Size</th>';
    orderTable += '<th style="border: 1px solid #ddd; padding: 8px;">Quantity</th>';
    orderTable += '<th style="border: 1px solid #ddd; padding: 8px;">Created By</th>';
    orderTable += '</tr>';

    
    matchingOrders.forEach((order) => {
      orderTable += '<tr>';
      orderTable += `<td style="border: 1px solid #ddd; padding: 8px;">${order.item}</td>`;
      orderTable += `<td style="border: 1px solid #ddd; padding: 8px;">${order.size}</td>`;
      orderTable += `<td style="border: 1px solid #ddd; padding: 8px;">${order.quantity}</td>`;
      orderTable += `<td style="border: 1px solid #ddd; padding: 8px;">${order.createdBy.name}</td>`;
      orderTable += '</tr>';
    });

    orderTable += '</table>';

   
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
              <p style="margin-bottom:10px;"><b>Matching Order List:</b></p>
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
  sendNotifyAdminMail,
  setPermitEmailCredentials,
  setAdminNotifyEmailCredentials,
  sendOrderListMail
};
