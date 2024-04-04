import { feedModel } from '../../models/model';
import BaseEntity from '../base-mongo.entity';

class FeedEntity extends BaseEntity {
    constructor() {
        super(feedModel);
    }

    async findPostByUUID(feedUUID: string) {
        const postData = await this.findOne({ feedUUID: feedUUID });
        return postData;
    }

    async addPost(data: any) {
        const newPost = await this.saveData(data);
        return newPost;
    }

    async updatePost(uuid: string, data: any) {
        const result = await this.findOneAndUpdate({ feedUUID: uuid }, { $set: data }, { new: true });
        return result;
    }
}

export const feedPostEntityV1 = new FeedEntity();
