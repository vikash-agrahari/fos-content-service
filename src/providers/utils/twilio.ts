/**
 * @file twilio.service
 * @description defines twilio methods
 * @author DiabeticU Dev Team
 */
import { Twilio } from 'twilio';
import { config } from '../aws/secret-manager';
import { Config } from '../../interfaces/config';
class TwilioClass {
    private accountSid: string;
    private authToken: string;
    private twilioNumber: string;
    private client: any;

    constructor() {
        this.accountSid = config.get(Config.TWILIO_ACCOUNT_SID);
        this.authToken = config.get(Config.TWILIO_AUTH_TOKEN);
        this.twilioNumber = config.get(Config.TWILIO_PHONE_NO);
        this.client = new Twilio(this.accountSid, this.authToken);
    }
    /**
     * sends the sms to the receiver
     */

    async sendSms(receiver: string, messageToSend: any) {
        console.log('data:', receiver);
        console.log('data:', messageToSend);

        this.client.messages
            .create({
                from: this.twilioNumber,
                to: receiver,
                body: messageToSend.otp,
            })
            .then((message: any) => console.log('OTP sent successfully', message.sid))
            .catch((err: any) => {
                console.log('err', err);
            });
    }
}

export const twilioService = new TwilioClass();
