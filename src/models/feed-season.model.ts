import { Schema, Document, Types } from 'mongoose';
import { COLLECTION } from '../interfaces/enum';
import { mongo } from '../providers/database/mongo.connection';

export interface IFeedSeason extends Document {
    _id: Types.ObjectId;
    seasonName: string;
    monetisationsEnabled: boolean;
    amount: number;
    userId: string;
}
const feedSeasonSchemae: Schema<IFeedSeason> = new Schema<IFeedSeason>(
    {
        _id: { type: Schema.Types.ObjectId, required: true, auto: true },
        seasonName: { type: String, index: true, unique: true, required: true },
        userId: { type: Schema.Types.String, ref: COLLECTION.USER },
        monetisationsEnabled: { type: Boolean, required: true },
        amount: { type: Number },
    },
    {
        timestamps: true,
        versionKey: false,
        collection: COLLECTION.FEED_SEASON,
    }
);

export const feedSeasonModel = mongo.getConnection().model<IFeedSeason>(COLLECTION.FEED_SEASON, feedSeasonSchemae);
