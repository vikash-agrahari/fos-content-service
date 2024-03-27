import { hashTagModel } from '../../models/model';
import BaseEntity from '../base-mongo.entity';

class HashTagEntity extends BaseEntity {
    constructor() {
        super(hashTagModel);
    }

    async createAllNewHashtag(hashtags: any[]) {
        const data = await this.insertMany(hashtags, {});
        return data;
    }

    async getHashTagByName(name: string) {
        const result = await this.findOne({ hashtag: name });
        return result;
    }

    async createNewHashTag(tag: string) {
        const tagData = await this.saveData({ hashtag: tag });
        return tagData;
    }

    async incrementTagCount(id: string) {
        const result = await this.findOneAndUpdate({ _id: id }, { $inc: { count: 1 } }, { new: true });
        return result;
    }
}

export const hashTagEntityV1 = new HashTagEntity();
