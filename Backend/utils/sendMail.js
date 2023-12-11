// services/emailService.js
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'parthrajrathod1998@gmail.com',
        pass: 'bbyv zmqp vrpp itfr'
    }
});


  const sendVerificationEmail= (to, verificationCode) => {
    const mailOptions = {
      from: 'parthraj.rathod2508@gmail.com',
      to,
      subject: 'Verification OTP',
      text: `Your verification OTP is: ${verificationCode}`,
    };

    return transporter.sendMail(mailOptions);
  }

module.exports = {sendVerificationEmail}