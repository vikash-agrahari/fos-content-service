import { Request, Response } from 'express';
import { utils } from '../../providers/utils/utils';
import { ExceptionMessage, HttpStatusMessage, SuccessMessage } from '../../interfaces/enum';
import { contentPostEntityV1, contentSeasonEntityV1, hashTagEntityV1 } from '../../entity';
import { CustomException } from '../../providers/utils/exception.utils';
import { AcceptAny } from '../../interfaces/types';
import { HashTag } from '../../models/content-post.model';

class ContentPostController {
    createPost = async (req: Request, res: Response) => {
        try {
            const payload: ContentPostRequest.CreateRequest = req.body;
            const isExist = await contentPostEntityV1.findPostByUUID(payload.postUUID);
            if (isExist) {
                throw new CustomException(ExceptionMessage.POST_ALREADY_CREATED, HttpStatusMessage.CONFLICT).getError();
            }
            const hashTags: HashTag[] = [];
            if (payload.hashTags.length > 0) {
                payload.hashTags.forEach(async (element) => {
                    const isExist = await hashTagEntityV1.getHashTagByName(element);
                    if (isExist) {
                        await hashTagEntityV1.incrementTagCount(isExist?._id);
                        hashTags.push({
                            _id: isExist?._id,
                            hashtag: element,
                        });
                    } else {
                        const newData = await hashTagEntityV1.createNewHashTag(element);
                        hashTags.push({
                            _id: newData?._id,
                            hashtag: element,
                        });
                    }
                });
            }
            if (!payload?.season?._id) {
                const seasonData = await contentSeasonEntityV1.addSeason(payload?.season);
                payload.season = { ...payload?.season, _id: seasonData?._id };
            }
            payload.hashTags = hashTags;
            const postData: AcceptAny = await contentPostEntityV1.addPost(payload);
            const finalResponse = utils.response.successResponse(res, { _id: postData?._id }, SuccessMessage.POST_CREATED_SUCCESSFULLY);
            res.status(finalResponse.code).send(finalResponse);
        } catch (error) {
            const err = utils.response.errorResponse(res, error);
            res.status(err.code).send(err);
        }
    };

    // editContent = async (req: Request, res: Response) => {
    //     try {
    //         const payload: ContentRequest.EditRequest = req.body;
    //         await contentEntityV1.editContent(payload);
    //         const finalResponse = utils.response.successResponse(res, {}, SuccessMessage.CONTENT_UPDATED_SUCCESSFULLY);
    //         res.status(finalResponse.code).send(finalResponse);
    //     } catch (error) {
    //         const err = utils.response.errorResponse(res, error);
    //         res.status(err.code).send(err);
    //     }
    // };

    // getContent = async (req: Request, res: Response) => {
    //     try {
    //         const payload = req.query;
    //         const data = await contentEntityV1.getContent(payload);
    //         const finalResponse = utils.response.successResponse(res, data, SuccessMessage.CONTENT_GET_SUCCESSFULLY);
    //         res.status(finalResponse.code).send(finalResponse);
    //     } catch (error) {
    //         const err = utils.response.errorResponse(res, error);
    //         res.status(err.code).send(err);
    //     }
    // };

    // getContentDetail = async (req: Request, res: Response) => {
    //     try {
    //         const payload = req.query;
    //         const data = await contentEntityV1.contentDetail({ _id: payload.contentId as string });
    //         const finalResponse = utils.response.successResponse(res, data, SuccessMessage.SUCCESS);
    //         res.status(finalResponse.code).send(finalResponse);
    //     } catch (error) {
    //         const err = utils.response.errorResponse(res, error);
    //         res.status(err.code).send(err);
    //     }
    // };
}

export const contentPostControllerV1 = new ContentPostController();
