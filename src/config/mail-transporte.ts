import nodemailer from "nodemailer";
import {Options} from "nodemailer/lib/mailer";


const host = "smtp.gmail.com"
const EMAIL_ADDRESS = "neatsoftmailparser@gmail.com"
const EMAIL_PASSWORD = "uffobfeeutfsiqzd"

export class MailTransporter {
    private provider;

    constructor() {
        this.provider = nodemailer.createTransport(
            {
                host: `${host}`,
                port: 587, // 587
                secure: false, // true for 465, false for other ports
                auth: {
                    user: `${EMAIL_ADDRESS}`,
                    pass: `${EMAIL_PASSWORD}`
                }
            },
            {
                from: `Mailer Test <${EMAIL_ADDRESS}>`
            }
        )
    }

    public send(message: Options) {
        this.provider.sendMail(message, (err, info) => {
            if(err) return console.log(err.message)
            console.log('Email sent: ', info);
        })
    }
}