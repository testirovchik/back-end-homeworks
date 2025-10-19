import nodemailer from "nodemailer";


export const sendEmail = async(to, subject, text) => {
  const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "your.service.777.service@gmail.com",
    pass: "yxqt hlie xdvh dgjf",
  },
});

  const mailOptions = {
      from: "your.service.777.service@gmail.com",
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