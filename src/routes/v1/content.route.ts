import { Router } from 'express';
import { validate } from '../../middlewares/validation/validation';
import Joi from 'joi';
import { JOI_VALIDATION } from '../../middlewares/validation/joi.validation';
import { feedControllerV1 } from '../../controllers/controller';

class ContentRoute {
    private ContentRoute: Router;
    constructor() {
        this.ContentRoute = Router();
    }

    loadContentRoutes() {
        this.ContentRoute.post('/feed', validate.body(Joi.object(JOI_VALIDATION.CONTENT.FEED.CREATE)), feedControllerV1.createFeed);

        this.ContentRoute.put('/feed/:uuid', validate.body(Joi.object(JOI_VALIDATION.CONTENT.FEED.EDIT)), feedControllerV1.editFeed);

        // this.ContentRoute.get(
        //     '/',
        //     validate.headers(Joi.object({ lang: CUSTOM_JOI.LANG }).unknown(true)),
        //     validate.queryParam(Joi.object(JOI_VALIDATION.CONTENT.PAGINATION)),
        //     contentControllerV1.getContent
        // );

        // this.ContentRoute.get(
        //     '/detail',
        //     validate.headers(Joi.object({ lang: CUSTOM_JOI.LANG }).unknown(true)),
        //     validate.queryParam(Joi.object(JOI_VALIDATION.CONTENT.DETAIL)),
        //     contentControllerV1.getContentDetail
        // );

        return this.ContentRoute;
    }
}

export const contentRouteV1 = new ContentRoute();
