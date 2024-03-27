/**
 * @file common/validations
 * @description exposes all the validation objects
 */

import Joi from 'joi';
import { DATABASE } from '../../common/constants';

export const CUSTOM_JOI = {
    LANG: Joi.string()
        .min(1)
        .valid(...Object.values(DATABASE.LANGUAGE))
        .required()
        .trim(),
};

export const JOI_VALIDATION = {
    COMMON_HEADERS: {
        deviceid: Joi.string().trim().required(),
        devicetoken: Joi.string().min(1).max(64).trim().optional(),
        devicetype: Joi.string().min(1).max(64).trim().optional(),
        lang: Joi.string().min(1).optional().trim(),
        timestamp: Joi.string().min(1).trim(),
        ip: Joi.string().trim().min(1).optional(),
    },

    GENERAL: {
        PAGINATION: {
            page: Joi.number().min(1).required(),
            limit: Joi.number().min(3).max(100).default(10).optional(),
            search: Joi.string().trim().optional(),
            sortKey: Joi.string().optional(),
            sortOrder: Joi.string().optional(),
            from: Joi.string().optional(),
            to: Joi.string().optional(),
            status: Joi.number().optional(),
        },
        SEARCH_PAGINATION: {
            page: Joi.number().min(1).required(),
            limit: Joi.number().min(1).max(100).default(10).optional(),
            search: Joi.string().trim().min(1).max(50).optional(),
            type: Joi.number().required(),
        },
    },
};
