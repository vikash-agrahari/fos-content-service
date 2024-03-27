/**
 * @name constant
 * @description defines enum values
 * @author DiabeticU Dev Team
 */

import { config } from '../providers/aws/secret-manager';
import { Config } from '../interfaces/config';

export const GRPC = {
    PROTO_FILE_OPTIONS: {
        keepCase: true,
        longs: String,
        enums: String,
        defaults: true,
        oneofs: true,
    },

    PROTO_FILE_NAME: {
        USER_ACTIVITY_PROTO: 'user-activity.proto',
    },
    PACKAGE: {
        USER_ACTIVITY_PACKAGE: 'userActivityPackage',
    },
    REMOTE_METHOD: {
        IS_FAVORITE: 'isFavorite',
    },
};

export const NODEMAILER_CONFIG = {
    service: 'gmail',
    auth: {
        user: <string>config.get(Config.SES_MAIL_USERNAME),
        pass: <string>config.get(Config.SES_MAIL_PASSWORD),
    },
};

export const SERVER = {
    DISPLAY_COLOUR: true,
    BY_PASS_OTP: 1212,
};

export const KAFKA_CONFIG = {
    TOPICS: {
        SYNC_MEAL: {
            topic: 'sync_meal',
            numPartitions: 3,
            replicationFactor: 2,
        },
    },
};

export const ERROR_TYPES = ['unhandledRejection', 'uncaughtException'];
export const SIGNAL_TRAPS = ['SIGTERM', 'SIGINT', 'SIGUSR2'];

export const DATABASE = {
    LANGUAGE: {
        EN: 'en',
        SP: 'sp',
    },
};

export const STATUS = {
    ACTIVE: 1,
    INACTIVE: 2,
};

export const CURSOR = { BATCH_SIZE: 100 };
