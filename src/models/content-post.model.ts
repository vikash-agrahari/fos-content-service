import { Schema, Document, Types } from 'mongoose';
import { mongo } from '../providers/database/mongo.connection';
import { CONTENT_VISIBILITY, COLLECTION, CONTENT_WARNING, REPORT_STATUS } from '../interfaces/enum';

interface HashTag {
    _id: Types.ObjectId;
    hashtag: string;
}

interface TaggedUser {
    userId: Types.ObjectId;
    profileImage: string;
    name: string;
    username: string;
}

interface ContentCategory {
    _id: Types.ObjectId;
    categoryName: string;
}

interface ContentSeason {
    _id: Types.ObjectId;
    seasonName: string;
    monetisationsEnabled: boolean;
    amount: number;
}

export interface IContentPost extends Document {
    _id: Types.ObjectId;
    postUUID: string;
    pictureUrls?: string[];
    videoUrls?: string[];
    userID: Types.ObjectId;
    caption?: string;
    hashTags: HashTag[];
    taggedUsers: TaggedUser[];
    visibility: number;
    underEighteen: boolean;
    warning?: number[];
    categories: ContentCategory[];
    season?: ContentSeason;
    textCommentsEnabled: boolean;
    voiceComments: {
        enabled: boolean;
        amount: number;
    };
    doubleMonetisations: {
        enabled: boolean;
        amount: number;
    };
    reportedCount?: number;
    reportStatus?: number;
    viewCount?: number;
    sharedCount?: number;
    likesCount?: number;
    likes?: string[];
    comments?: string[];
}

const hashTagSchema = new Schema(
    {
        _id: { type: Schema.Types.ObjectId, ref: COLLECTION.HASHTAG },
        hashtag: { type: String },
    },
    { _id: false }
);

const contentCategorySchema = new Schema(
    {
        _id: { type: Schema.Types.ObjectId, ref: COLLECTION.CONTENT_CATEGORY },
        categoryName: { type: String },
    },
    { _id: false }
);

const contentSeasonSchema = new Schema(
    {
        _id: { type: Schema.Types.ObjectId, ref: COLLECTION.CONTENT_SEASON },
        seasonName: { type: String },
        monetisationsEnabled: { type: Boolean, default: false },
        amount: { type: Number },
    },
    { _id: false }
);

const contentPostSchema: Schema<IContentPost> = new Schema<IContentPost>(
    {
        _id: { type: Schema.Types.ObjectId, required: true, auto: true },
        postUUID: { type: String, required: true, unique: true },
        pictureUrls: [{ type: String }],
        videoUrls: [{ type: String }],
        userID: { type: Schema.Types.ObjectId, ref: COLLECTION.USER },
        caption: { type: String },
        hashTags: {
            type: [hashTagSchema],
            validate: [arrayLimitValidator, '{PATH} exceeds the limit of 6'],
        },
        taggedUsers: [
            {
                userId: { type: Schema.Types.ObjectId, ref: COLLECTION.USER },
                profileImage: { type: String },
                name: { type: String },
                username: { type: String },
            },
            { _id: false },
        ],
        visibility: { type: Number, required: true, enum: CONTENT_VISIBILITY },
        underEighteen: { type: Boolean, required: true },
        warning: [{ type: Number, enum: CONTENT_WARNING }],
        categories: {
            type: [contentCategorySchema],
            validate: [arrayLimitValidator, '{PATH} exceeds the limit of 6'],
        },
        season: { type: contentSeasonSchema },
        textCommentsEnabled: { type: Boolean, default: false },
        voiceComments: {
            enabled: { type: Boolean, default: false },
            amount: { type: Number },
        },
        doubleMonetisations: {
            enabled: { type: Boolean, default: false },
            amount: { type: Number },
        },
        reportedCount: { type: Number, default: 0 },
        reportStatus: { type: Number, enum: REPORT_STATUS },
        viewCount: { type: Number, default: 0 },
        sharedCount: { type: Number, default: 0 },
        likesCount: { type: Number, default: 0 },
        likes: [
            {
                type: Schema.Types.ObjectId,
                ref: COLLECTION.USER,
            },
        ],
        comments: [
            {
                type: Schema.Types.ObjectId,
                ref: COLLECTION.COMMENTS,
            },
        ],
    },
    {
        versionKey: false,
        collection: COLLECTION.CONTENT_POST,
        timestamps: true,
    }
);

function arrayLimitValidator(val: any[]) {
    return val.length <= 6;
}

export const ContentPostModel = mongo.getConnection().model<IContentPost>(COLLECTION.CONTENT_POST, contentPostSchema);
