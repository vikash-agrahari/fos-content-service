import * as nodemailer from 'nodemailer';
import { utils } from './utils';
import { config } from '../aws/secret-manager';
import { Config } from '../../interfaces/config';

export class MailManager {
    private senderEmail: string = config.get(Config.SMTP_FROM_EMAIL);
    private AWSsenderEmail: string = config.get(Config.AWS_SES_FROM_EMAIL);
    private environment: string = config.get(Config.ENVIRONMENT);

    constructor(private receiverEmail: string, private subject: string, private content: any) {}

    /**
     * @description Function to send mail through AWS SES and SMTP baseed on condition
     * @param SESflag
     * @returns
     */
    async sendMail(SESflag = false) {
        try {
            // if you want to send mail through SES it will be applicatble for production only and for prod and dev we will use this same SMTP credentials
            if (SESflag == true && this.environment == 'production') {
                console.log('----sending mail via SMTP-----');
                const transporter = nodemailer.createTransport({
                    host: config.get(Config.AWS_SES_HOST),
                    port: config.get(Config.AWS_SES_PORT),
                    secure: false,
                    tls: {
                        rejectUnauthorized: false,
                    },
                    auth: {
                        user: config.get(Config.AWS_SES_MAIL_USERNAME),
                        pass: config.get(Config.SMTP_MAIL_PASSWORD),
                    },
                    authMethod: 'PLAIN',
                });
                const senderEmail = this.AWSsenderEmail;
                const mailOptions = {
                    from: senderEmail, // sender email
                    to: this.receiverEmail, // list of receivers
                    subject: this.subject, // Subject line
                    html: this.content,
                };

                const mailResponse = await transporter.sendMail(mailOptions);
                utils.consolelog('mail AWS Response', mailResponse, false);
                return mailResponse;
            } else {
                console.log('----sending mail via SMTP-----');

                const transporter = nodemailer.createTransport({
                    host: config.get(Config.SMTP_HOST),
                    port: config.get(Config.SMTP_PORT),
                    secure: false,
                    tls: {
                        minVersion: 'TLSv1',
                        rejectUnauthorized: false,
                    },
                });
                const senderEmail = this.senderEmail;
                const mailOptions = {
                    from: senderEmail, // sender email
                    to: this.receiverEmail, // list of receivers
                    subject: this.subject, // Subject line
                    html: this.content,
                };
                const mailResponse = await transporter.sendMail(mailOptions);
                console.log(`--emailStatement----mailResponse----${JSON.stringify(mailResponse)}`);
                return {};
            }
        } catch (error) {
            utils.consolelog('MailManager', error, false);
        }
        return {};
    }

    /**
     * @deprecated Function to send mail through AWS SES
     * @returns
     */
    async sendAWSMail() {
        try {
            const transporter = nodemailer.createTransport({
                host: config.get(Config.AWS_SES_HOST),
                port: config.get(Config.AWS_SES_PORT),
                secure: false,
                tls: { rejectUnauthorized: false },
                auth: {
                    user: config.get(Config.AWS_SES_MAIL_USERNAME),
                    pass: config.get(Config.SMTP_MAIL_PASSWORD),
                },
                authMethod: 'PLAIN',
            });
            const senderEmail = this.senderEmail;
            const mailOptions = {
                from: senderEmail, // sender email
                to: this.receiverEmail, // list of receivers
                subject: this.subject, // Subject line
                html: this.content,
            };
            const mailResponse = await transporter.sendMail(mailOptions);
            console.log(`-- AWS emailStatement----mailResponse----${JSON.stringify(mailResponse)}`);
            return {};
        } catch (error) {
            utils.consolelog('MailAWSManager', error, false);
        }
        return {};
    }
}
