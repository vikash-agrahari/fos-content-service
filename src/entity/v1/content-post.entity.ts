import { contentPostModel } from '../../models/model';
import BaseEntity from '../base-mongo.entity';

class ContentPostEntity extends BaseEntity {
    constructor() {
        super(contentPostModel);
    }

    async findPostByUUID(postUUID: string) {
        const postData = await this.findOne({ postUUID: postUUID });
        return postData;
    }

    async addPost(data: any) {
        const newPost = await this.saveData(data);
        return newPost;
    }

    async updatePost(uuid: string, data: any) {
        const result = await this.findOneAndUpdate({ postUUID: uuid }, { $set: data }, { new: true });
        return result;
    }
}

export const contentPostEntityV1 = new ContentPostEntity();
