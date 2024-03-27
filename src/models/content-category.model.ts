import { Schema, Document, Types } from 'mongoose';
import { COLLECTION } from '../interfaces/enum';
import { mongo } from '../providers/database/mongo.connection';

export interface IContentCategory extends Document {
    _id: Types.ObjectId;
    categoryName: string;
}
const contentCategorySchemae: Schema<IContentCategory> = new Schema<IContentCategory>(
    {
        _id: { type: Schema.Types.ObjectId, required: true, auto: true },
        categoryName: { type: String, index: true, unique: true, required: true },
    },
    {
        timestamps: true,
        versionKey: false,
        collection: COLLECTION.CONTENT_CATEGORY,
    }
);

export const contentCategoryModel = mongo.getConnection().model<IContentCategory>(COLLECTION.CONTENT_CATEGORY, contentCategorySchemae);
