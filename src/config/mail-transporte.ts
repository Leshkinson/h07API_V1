import nodemailer from "nodemailer";
import {Options} from "nodemailer/lib/mailer";


const host = 'smtp.ethereal.email'
const EMAIL_ADDRESS = 'bette51@ethereal.email'
const EMAIL_PASSWORD = 'zGBdZGEBmraEufFgFU'

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