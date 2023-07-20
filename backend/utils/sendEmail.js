import { createTransport } from "nodemailer";

export const sendEmail = async (options) => {
  // console.log(options);
  const transporter = createTransport({
    // host: "smtp.gmail.com",//process.env.SMTP_HOST
    // port: 465,//process.env.SMTP_PORT
    // secure: false,
    service: process.env.SMTP_SERVICE,  //process.env.SMTP_SERVICE
    auth: {
      user:  process.env.SMTP_MAIL, //process.env.SMTP_MAIL,
      pass: process.env.SMTP_PASSWORD//process.env.SMTP_PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.SMTP_MAIL,//process.env.SMTP_MAIL,
    to: options.email,  //options.email "ankit6686482@gmail.com"
    subject: options.subject,
    text: options.message,
  };

  await transporter.sendMail(mailOptions);
};