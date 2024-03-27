import { contentCategoryModel } from '../../models/model';
import BaseEntity from '../base-mongo.entity';

class ContentCategoryEntity extends BaseEntity {
    constructor() {
        super(contentCategoryModel);
    }
}

export const contentCategoryEntityV1 = new ContentCategoryEntity();
