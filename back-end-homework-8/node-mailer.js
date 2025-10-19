import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

export const sendEmail = async(to, subject, text) => {
  const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

  const mailOptions = {
      from: process.env.EMAIL_USER,
      to,
      subject,
      text
  }

  transporter.sendMail(mailOptions, (error, info) => {
      if(error) {
          console.error(error)
      }else {
          console.log(info)
      }
  })
}