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
    CONTENT: {
        POST: {
            CREATE: {
                postUUID: Joi.string().length(36).required(),
                pictureUrls: Joi.array().items(Joi.string()).required(),
                videoUrls: Joi.array().items(Joi.string()),
                userID: Joi.string().length(24).required(),
                caption: Joi.string(),
                hashTags: Joi.array().items(Joi.string()).max(6).optional(),
                taggedUsers: Joi.array()
                    .items(
                        Joi.object({
                            userId: Joi.string().length(24).required(),
                            profileImage: Joi.string().required(),
                            name: Joi.string().required(),
                            username: Joi.string().required(),
                        }).required()
                    )
                    .required(),
                visibility: Joi.number().required(),
                underEighteen: Joi.boolean().required(),
                warning: Joi.array().items(Joi.number()),
                categories: Joi.array()
                    .items(
                        Joi.object({
                            _id: Joi.string().length(24).required(),
                            categoryName: Joi.string().required(),
                        }).required()
                    )
                    .required(),
                season: Joi.object({
                    _id: Joi.string().length(24).optional(),
                    seasonName: Joi.string().required(),
                    monetisationsEnabled: Joi.boolean().optional(),
                    amount: Joi.number().optional(),
                }).allow(null),
                textCommentsEnabled: Joi.boolean().required(),
                voiceComments: Joi.object({
                    enabled: Joi.boolean().required(),
                    amount: Joi.number().required(),
                }).required(),
                doubleMonetisations: Joi.object({
                    enabled: Joi.boolean().required(),
                    amount: Joi.number().required(),
                }).required(),
            },
            EDIT: {
                caption: Joi.string(),
                hashTags: Joi.array().items(Joi.string()).max(6),
                taggedUsers: Joi.array().items(
                    Joi.object({
                        userId: Joi.string().length(24).required(),
                        profileImage: Joi.string().required(),
                        name: Joi.string().required(),
                        username: Joi.string().required(),
                    }).required()
                ),
                visibility: Joi.number(),
                underEighteen: Joi.boolean(),
                warning: Joi.array().items(Joi.number()),
                categories: Joi.array().items(
                    Joi.object({
                        _id: Joi.string().length(24).required(),
                        categoryName: Joi.string().required(),
                    }).required()
                ),
                season: Joi.object({
                    _id: Joi.string().length(24),
                    seasonName: Joi.string().required(),
                    monetisationsEnabled: Joi.boolean(),
                    amount: Joi.number(),
                }).allow(null),
                textCommentsEnabled: Joi.boolean(),
                voiceComments: Joi.object({
                    enabled: Joi.boolean().required(),
                    amount: Joi.number().required(),
                }),
                doubleMonetisations: Joi.object({
                    enabled: Joi.boolean().required(),
                    amount: Joi.number().required(),
                }),
            },
        },
    },
};
