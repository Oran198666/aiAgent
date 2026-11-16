import nodemailer from "nodemailer";
import { appConfig } from "./appConfig";
import Mail from "nodemailer/lib/mailer";

class Mailer {
    private transport = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            user: appConfig.gmailUser,
            pass: appConfig.gmailAppPassword
        }
    });

    public async send(subject: string, body: string, to: string): Promise<void> {
        const message: Mail.Options = {
            subject,
            text: body,
            to
        };
        const result = await this.transport.sendMail(message);
        console.log("================");
        console.log(result);
        console.log("================");
    }
}

export const mailer = new Mailer();