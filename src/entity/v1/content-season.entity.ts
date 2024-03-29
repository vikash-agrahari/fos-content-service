import { contentSeasonModel } from '../../models/model';
import BaseEntity from '../base-mongo.entity';

class ContentSeasonEntity extends BaseEntity {
    constructor() {
        super(contentSeasonModel);
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

export const contentSeasonEntityV1 = new ContentSeasonEntity();
