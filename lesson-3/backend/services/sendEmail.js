const nodemailer = require('nodemailer');

const password = process.env.OUTLOOK_PSW || 'password'

// async..await is not allowed in global scope, must use a wrapper
async function sendEmail(data) {
    const {name, email, text} = data;

    // create a reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: 'smtp-mail.outlook.com',
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: 'vokur@msn.com', // generated ethereal user
            pass: password, // generated ethereal password
        },
    });

    const message = `
    <p>You received email from ${name}</p>
    <p>Contact email ${email}</p>
    <p>Message: ${text}</p>}
    `;

    // send mail with a defined transport object
    let info = await transporter.sendMail({
        from: 'vokur@msn.com', // sender address
        to: email, // list of receivers
        subject: 'April 2023 First Conference of Biotechnologist', // Subject line
        text: text, // plain text body
        html: message, // html body
    });

    console.log('Message sent: %s', info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}

module.exports = sendEmail;
