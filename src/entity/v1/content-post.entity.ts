import { ContentPostModel } from '../../models/content-post.model';
import BaseEntity from '../base-mongo.entity';

class ContentPostEntity extends BaseEntity {
    constructor() {
        super(ContentPostModel);
    }
}

export const contentPostEntityV1 = new ContentPostEntity();
