import { Schema, Document } from 'mongoose';
import { COLLECTION } from '../interfaces/enum';
import { mongo } from '../providers/database/mongo.connection';

export interface IHashTag extends Document {
    _id?: string;
    hashtag: string;
    count?: number;
}
const hashTagSchemae: Schema<IHashTag> = new Schema<IHashTag>(
    {
        _id: { type: Schema.Types.ObjectId, required: true, auto: true },
        hashtag: { type: String, index: true, unique: true, required: true },
        count: { type: Number, default: 1 },
    },
    {
        timestamps: true,
        versionKey: false,
        collection: COLLECTION.HASHTAG,
    }
);

export const hashTagModel = mongo.getConnection().model<IHashTag>(COLLECTION.HASHTAG, hashTagSchemae);
