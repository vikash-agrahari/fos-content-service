import { Schema, Document, Types } from 'mongoose';
import { COLLECTION } from '../interfaces/enum';
import { mongo } from '../providers/database/mongo.connection';

export interface IFeedCategory extends Document {
    _id: Types.ObjectId;
    categoryName: string;
}
const feedCategorySchemae: Schema<IFeedCategory> = new Schema<IFeedCategory>(
    {
        _id: { type: Schema.Types.ObjectId, required: true, auto: true },
        categoryName: { type: String, index: true, unique: true, required: true },
    },
    {
        timestamps: true,
        versionKey: false,
        collection: COLLECTION.FEED_CATEGORY,
    }
);

export const feedCategoryModel = mongo.getConnection().model<IFeedCategory>(COLLECTION.FEED_CATEGORY, feedCategorySchemae);
