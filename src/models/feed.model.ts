import { Schema, Document, Types } from 'mongoose';
import { mongo } from '../providers/database/mongo.connection';
import { CONTENT_VISIBILITY, COLLECTION, CONTENT_WARNING, REPORT_STATUS, FEED_TYPE } from '../interfaces/enum';

export interface HashTag {
    _id: string;
    hashtag: string;
}

interface TaggedUser {
    userId: Types.ObjectId;
    profileImage: string;
    name: string;
    username: string;
}

interface FeedCategory {
    _id: Types.ObjectId;
    categoryName: string;
}

interface FeedSeason {
    _id: Types.ObjectId;
    seasonName: string;
    monetisationsEnabled: boolean;
    amount: number;
}

export interface IFeed extends Document {
    _id: Types.ObjectId;
    feedType: number;
    pictureUrls: string[];
    videoUrls?: string[];
    userID: Types.ObjectId;
    caption?: string;
    hashTags: HashTag[];
    taggedUsers: TaggedUser[];
    visibility: number;
    underEighteen: boolean;
    warning?: number[];
    categories: FeedCategory[];
    season?: FeedSeason;
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
    reactions?: string;
    commentsCount?: string;
}

const hashTagSchema = new Schema(
    {
        _id: { type: Schema.Types.ObjectId, ref: COLLECTION.HASHTAG },
        hashtag: { type: String },
    },
    { _id: false }
);

const feedCategorySchema = new Schema(
    {
        _id: { type: Schema.Types.ObjectId, ref: COLLECTION.FEED_CATEGORY },
        categoryName: { type: String },
    },
    { _id: false }
);

const feedSeasonSchema = new Schema(
    {
        _id: { type: Schema.Types.ObjectId, ref: COLLECTION.FEED_SEASON },
        seasonName: { type: String },
        monetisationsEnabled: { type: Boolean, default: false },
        amount: { type: Number },
    },
    { _id: false }
);

const taggedUsersSchema = new Schema(
    {
        userId: { type: Schema.Types.ObjectId, ref: COLLECTION.USER },
        profileImage: { type: String },
        name: { type: String },
        username: { type: String },
    },
    { _id: false }
);

const feedSchema: Schema<IFeed> = new Schema<IFeed>(
    {
        _id: { type: Schema.Types.ObjectId, required: true, unique: true, auto: true },
        feedType: { type: Schema.Types.Number, required: true, enum: FEED_TYPE },
        pictureUrls: [{ type: String, required: true }],
        videoUrls: [{ type: String }],
        userID: { type: Schema.Types.ObjectId, ref: COLLECTION.USER },
        caption: { type: String },
        hashTags: {
            type: [hashTagSchema],
        },
        taggedUsers: [taggedUsersSchema],
        visibility: { type: Number, required: true, enum: CONTENT_VISIBILITY },
        underEighteen: { type: Boolean, required: true },
        warning: [{ type: Number, enum: CONTENT_WARNING }],
        categories: {
            type: [feedCategorySchema],
        },
        season: { type: feedSeasonSchema },
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
        commentsCount: { type: Number, default: 0 },
        reactions: {
            type: Schema.Types.ObjectId,
            ref: COLLECTION.FEED_REACTION,
        },
    },
    {
        versionKey: false,
        collection: COLLECTION.FEED,
        timestamps: true,
    }
);

export const feedModel = mongo.getConnection().model<IFeed>(COLLECTION.FEED, feedSchema);
