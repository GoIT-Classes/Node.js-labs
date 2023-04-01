const nodemailer = require('nodemailer');

// async..await is not allowed in global scope, must use a wrapper
async function sendEmail(data) {
  const { userName, userEmail } = data;

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: 'smtp-mail.outlook.com',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: 'vokur@msn.com', // generated ethereal user
      pass: 'password', // generated ethereal password
    },
  });

  const email = `<p>You received email from ${userName}</p>
    <p>Contact email ${userEmail}</p>
    <p>Message: ${userMessage}</p>}
    `;

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: 'vokur@msn.com', // sender address
    to: 'bar@example.com, baz@example.com', // list of receivers
    subject: 'April 2023 First Conference of Biotechnologists', // Subject line
    text: 'Hello world?', // plain text body
    html: email, // html body
  });

  console.log('Message sent: %s', info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}

module.exports = sendEmail;
