import { ResponseUtils } from './response.utils';
import { SERVER } from '../../common/constants';
import { isArray } from 'util';
import * as crypto from 'crypto';
import { config } from '../aws/secret-manager';
import { Config } from '../../interfaces/config';
import * as randomstring from 'randomstring';
class Utils {
    public response: ResponseUtils;
    constructor() {
        this.response = new ResponseUtils();
    }

    /**
     * @description Decode Base 64 String
     * @param {string} token
     * @returns
     */
    decodeBase64String(token: string) {
        const credentials = Buffer.from(token, 'base64').toString('ascii');
        return credentials.split(':');
    }

    /**
     * @description This methos is used to log the data on the console screen in red or green color
     * @param { string } identifier
     * @param { any } value
     * @param { boolean } status
     */
    consolelog = function (identifier: string, value: any, status = false) {
        try {
            const displayColors = SERVER.DISPLAY_COLOUR;
            if (isArray(value)) {
                value.forEach((obj, i) => {
                    if (status) {
                        console.info(
                            displayColors ? '\x1b[31m%s\x1b[0m' : '%s',
                            '<--------------' + identifier + '--------------' + i + '-------------->',
                            obj
                        );
                    } else {
                        console.error(
                            displayColors ? '\x1b[31m%s\x1b[0m' : '%s',
                            '<--------------' + identifier + '--------------' + i + '-------------->',
                            obj
                        );
                    }
                });
                return;
            } else {
                if (status) {
                    console.info(displayColors ? '\x1b[31m%s\x1b[0m' : '%s', '<--------------' + identifier + '-------------->', value);
                } else {
                    console.error(displayColors ? '\x1b[31m%s\x1b[0m' : '%s', '<--------------' + identifier + '-------------->', value);
                }
                return;
            }
        } catch (error) {
            return;
        }
    };

    /**
     * @description This mehtod is used to round off the digits if decimal exceeds
     * @param { number } figure
     * @param { number } decimals
     */
    roundOffIfDecimalExceed = function (figure: number, decimals = 2) {
        const value = Number(figure);
        return Number(value.toFixed(decimals));
    };

    /**
     * @description This mehtod is used to crypt the data
     * @param { string } stringToCrypt
     * @returns encrypted data
     */
    cryptData = async function (stringToCrypt: string) {
        const hmac = crypto.createHmac('sha256', config.get(Config.CRYPTO_SECRET));
        return hmac.update(stringToCrypt).digest('hex');
    };

    /**
     * @description This is used to decrypt the data
     * @param { string } stringToCheck
     * @param { string } dbString
     * @returns decrypted data
     */
    deCryptData = async function (stringToCheck: string, dbString: string) {
        const hmac = crypto.createHmac('sha256', config.get(Config.CRYPTO_SECRET));
        const crypted = hmac.update(stringToCheck).digest('hex');
        return dbString == crypted ? true : false;
    };

    /**
     * @description this mehtod is used to generate random string of x digit
     * @param { number } digits
     * @returns random string
     */
    generateRandomString(digits: number) {
        return randomstring.generate(digits);
    }

    /**
     * @description This method is used to generate a random OTP
     * @returns random generated OTP
     */
    generateOtp() {
        return Math.floor(1000 + Math.random() * 9000);
    }
}

export const utils = new Utils();
