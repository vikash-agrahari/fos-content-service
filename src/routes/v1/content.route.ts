import { Router } from 'express';
import { validate } from '../../middlewares/validation/validation';
import Joi from 'joi';
import { JOI_VALIDATION } from '../../middlewares/validation/joi.validation';
import { contentPostControllerV1 } from '../../controllers/v1/v1.controller';

class ContentRoute {
    private ContentRoute: Router;
    constructor() {
        this.ContentRoute = Router();
    }

    loadContentRoutes() {
        this.ContentRoute.post('/post', validate.body(Joi.object(JOI_VALIDATION.CONTENT.POST.CREATE)), contentPostControllerV1.createPost);

        this.ContentRoute.put('/post/:UUID', validate.body(Joi.object(JOI_VALIDATION.CONTENT.POST.EDIT)), contentPostControllerV1.editPost);

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
