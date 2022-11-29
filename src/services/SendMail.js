const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.MAIL_FROM,
        pass: process.env.MAIL_PASSWORD
    }
})

const sendMail = async (to, subject, text) => {
    const mailOptions = {
        from: process.env.MAIL_FROM,
        to,
        subject,
        text
    }

    return await transporter.sendMail(mailOptions)
}

module.exports = sendMail