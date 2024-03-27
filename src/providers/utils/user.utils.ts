/**
 * @file user.utils
 * @description defines user utils functions
 * @author DiabeticU Dev Team
 */

import { ExceptionMessage, HttpStatusMessage } from '../../interfaces/enum';
import { CustomException } from './exception.utils';
import { utils } from './utils';

/** get adminId from permission token */
export const localsUserId = async function (userData: string) {
    if (!userData) {
        throw new CustomException(ExceptionMessage.MISSING_PERMISSION_TOKEN, HttpStatusMessage.UNAUTHORIZED).getError();
    } else {
        try {
            let encryptData = JSON.parse(userData);
            encryptData = typeof encryptData === 'string' ? JSON.parse(encryptData) : encryptData;
            return encryptData.userId;
        } catch (error) {
            utils.consolelog('localsUserData', error, false);
            throw error;
        }
    }
};

/** get AdminData from permission token */
export const localsUserData = async function (userData: string) {
    if (!userData) {
        throw new CustomException(ExceptionMessage.MISSING_PERMISSION_TOKEN, HttpStatusMessage.UNAUTHORIZED).getError();
    } else {
        try {
            let encryptData = JSON.parse(userData);
            encryptData = typeof encryptData === 'string' ? JSON.parse(encryptData) : encryptData;
            return encryptData;
        } catch (error) {
            utils.consolelog('localsUserData', error, false);
            throw error;
        }
    }
};
