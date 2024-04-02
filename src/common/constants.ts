export const GRPC = {
    PROTO_FILE_OPTIONS: {
        keepCase: true,
        longs: String,
        enums: String,
        defaults: true,
        oneofs: true,
    },
};

export const SERVER = {
    DISPLAY_COLOUR: true,
    BY_PASS_OTP: 1212,
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

export const KAFKA_CONFIG = {
    TOPICS: {
        CONTENT: {
            CREATED: 'content.created',
        },
    },
};
