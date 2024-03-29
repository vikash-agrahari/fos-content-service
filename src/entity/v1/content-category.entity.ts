import { contentCategoryModel } from '../../models/model';
import BaseEntity from '../base-mongo.entity';

class ContentCategoryEntity extends BaseEntity {
    constructor() {
        super(contentCategoryModel);
        //this.createBulkCategory(['movies', 'shopping', 'news', 'gaming']);
    }
    async getCategoryById(id: string) {
        const result = await this.findOne({ _id: id });
        return result;
    }
    async createBulkCategory(categoryNames: any[]) {
        const categories = categoryNames.map((name) => ({ categoryName: name }));
        await this.model.insertMany(categories);
    }
}

export const contentCategoryEntityV1 = new ContentCategoryEntity();
