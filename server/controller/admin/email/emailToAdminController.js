const nodemailer = require("nodemailer");
require("dotenv").config();
const User = require("../../../model/userModel");
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

    const { notifyAdmin, notes, renewalDeadline } = req.body;

   

    // Find the user with the matching email
    console.log(notifyAdmin)
const user = await User.findOne({ _id: notifyAdmin  });

if (!user) {
  return res.status(404).json({
    code: 404,
    message: "Admin not found",
  });
}    console.log(user)
    const name = user.name;
 
    const workEmail = user.workEmail;

    console.log(workEmail)
  

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
          <p style="margin-bottom:10px;">Hello,</p>
          <p style="margin-bottom:10px;"><b>${notes}</b></p>
          <p style="margin-bottom:10px;">This is your warning! <b>Red</b>, your deadline is ${renewalDeadline}</p>
     
          <p style="text-align: center; margin-top: 50px; font-size: 12px;">Powered by &copy; PerceptronBD Ltd.</p>
        </td>
      </tr>
    </table>`,
    });

    res.json({
      code: 200,

      data: {
        name: name,
        notes: notes,
        sendEmail: workEmail,
      },
      message: "Mail Sent",
    });
  } catch (error) {
    console.error("Error occurred while sending email:", error);
    throw error;
  }
};

module.exports = {
  sendPermitMail,
};