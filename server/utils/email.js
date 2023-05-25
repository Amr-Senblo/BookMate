const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
  // 1) Create a transporter  --- transporter object comes from mailtrap site 
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EAMIL_PORT,
    auth: {
      user: '7f855379a86f97',
      pass: 'a3975c8e31db35',
    },
  });

  // 2) Define the email options
  const mailOptions = {
    from: 'Amr Senblo <amrsenblo@amil.com',
    to: options.email,
    subject: options.subject,
    text: options.message,
  };

  //   3) Actually send the email
  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
