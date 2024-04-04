import { feedSeasonModel } from '../../models/model';
import BaseEntity from '../base-mongo.entity';

class FeedSeasonEntity extends BaseEntity {
    constructor() {
        super(feedSeasonModel);
    }
    async addSeason(data: any) {
        const newSeason = await this.saveData(data);
        return newSeason;
    }

    async getSeasonByName(seasonName: string) {
        const data = await this.findOne({ seasonName: seasonName });
        return data;
    }
}

export const feedSeasonEntityV1 = new FeedSeasonEntity();
