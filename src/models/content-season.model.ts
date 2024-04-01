import { Schema, Document, Types } from 'mongoose';
import { COLLECTION } from '../interfaces/enum';
import { mongo } from '../providers/database/mongo.connection';

export interface IContentSeason extends Document {
    _id: Types.ObjectId;
    seasonName: string;
    monetisationsEnabled: boolean;
    amount: number;
}
const contentSeasonSchemae: Schema<IContentSeason> = new Schema<IContentSeason>(
    {
        _id: { type: Schema.Types.ObjectId, required: true, auto: true },
        seasonName: { type: String, index: true, unique: true, required: true },
        monetisationsEnabled: { type: Boolean, required: true },
        amount: { type: Number },
    },
    {
        timestamps: true,
        versionKey: false,
        collection: COLLECTION.CONTENT_SEASON,
    }
);

export const contentSeasonModel = mongo.getConnection().model<IContentSeason>(COLLECTION.CONTENT_SEASON, contentSeasonSchemae);
