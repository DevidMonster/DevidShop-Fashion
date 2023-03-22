const Contact = require('../models/contact');
require("dotenv").config()
const nodemailer = require("nodemailer");
const user = {
    email: process.env.EMAIL,
    pass: process.env.EMAIL_PASS,
}

const sendContact = async (req, res) => {
    try {
        let testAccount = await nodemailer.createTestAccount();
        console.log(user);
        let transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            service: 'gmail',
            port: "465",
            secure: true,
            pool: false,
            auth: {
                user: user.email,
                pass: user.pass
            }
        })
        let mailOptions = {
            from: `"User" <${req.body.email}>`,
            to: `mrbat905@gmail.com`,
            subject: `${req.body.subject}`,
            html: `
                <p>
                    email: ${req.body.email} <br>
                    phone: ${req.body.phoneNumber}
                </p>
                <p>
                    ${req.body.message}
                </p>
            `
        }
        await transporter.sendMail(mailOptions, async (error, info) => {
            if (error) {
                res.status(404).send(error)
            } else {
                const contact = new Contact(req.body)
                await contact.save()
                res.status(200).send('Email sent: ' + info.response)
            }
        })

        transporter.close();
    } catch (err) {
        res.status(404).json({ message: err.message })
    }
}
module.exports = { sendContact }

