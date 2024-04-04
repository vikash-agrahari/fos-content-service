import { Request, Response } from 'express';
import { utils } from '../../providers/utils/utils';
import { ExceptionMessage, HttpStatusMessage, SuccessMessage } from '../../interfaces/enum';
import { feedCategoryEntityV1, feedPostEntityV1, feedSeasonEntityV1, hashTagEntityV1 } from '../../entity';
import { CustomException } from '../../providers/utils/exception.utils';
import { AcceptAny } from '../../interfaces/types';
import { HashTag } from '../../models/feed.model';

class FeedController {
    createFeed = async (req: Request, res: Response) => {
        try {
            const payload: FeedRequest.CreateRequest = req.body;

            // Check if post with the provided UUID already exists
            const existingPost = await feedPostEntityV1.findPostByUUID(payload.feedUUID);
            if (existingPost) {
                throw new CustomException(ExceptionMessage.POST_ALREADY_CREATED, HttpStatusMessage.CONFLICT).getError();
            }

            // Process hash tags
            const hashTags: HashTag[] = [];
            const hashTagPromises: Promise<void>[] = payload.hashTags.map(async (element) => {
                const existingTag = await hashTagEntityV1.getHashTagByName(element);
                if (existingTag) {
                    await hashTagEntityV1.incrementTagCount(existingTag._id);
                    hashTags.push({ _id: existingTag._id, hashtag: element });
                } else {
                    const newTag = await hashTagEntityV1.createNewHashTag(element);
                    hashTags.push({ _id: newTag._id, hashtag: element });
                }
            });

            // Await all hash tag promises
            await Promise.all(hashTagPromises);
            payload.hashTags = hashTags;

            // Check if categories are valid
            if (payload.categories && payload.categories.length > 0) {
                await this.ckeckCategories(payload.categories);
            }

            if (payload.taggedUsers) {
                //TODO: check  user is valid or not
            }

            // Add season if not provided
            if (!payload.season?._id) {
                payload.season = await this.addNewSeason(payload?.season);
            }

            // Add post
            const postData: AcceptAny = await feedPostEntityV1.addPost(payload);

            const finalResponse = utils.response.successResponse(res, { _id: postData?._id }, SuccessMessage.POST_CREATED_SUCCESSFULLY);
            res.status(finalResponse.code).send(finalResponse);
        } catch (error) {
            const err = utils.response.errorResponse(res, error);
            res.status(err.code).send(err);
        }
    };

    editFeed = async (req: Request, res: Response) => {
        try {
            const payload: FeedRequest.EditRequest = req.body;
            const feedUUID: string = req.params.uuid;

            const keyField = Object.keys(payload);
            if (keyField.length > 1) {
                throw new CustomException(ExceptionMessage.INVALID_REQUEST, HttpStatusMessage.BAD_REQUEST).getError();
            }
            // Check if post with the provided UUID exists
            const postData = await feedPostEntityV1.findPostByUUID(feedUUID);
            if (!postData) {
                throw new CustomException(ExceptionMessage.POST_NOT_FOUND, HttpStatusMessage.BAD_REQUEST).getError();
            }

            switch (keyField[0]) {
                case 'hashTags':
                    payload.hashTags = await updateHashTags(payload.hashTags, postData);
                    break;
                case 'categories':
                    await this.ckeckCategories(payload.categories);
                    break;
                case 'taggedUsers':
                    //TODO: check  user is valid or not
                    break;
                case 'season':
                    if (!payload?.season?._id) {
                        payload.season = await this.addNewSeason(payload?.season);
                    }
                    break;
                default:
                    await feedPostEntityV1.updatePost(feedUUID, payload);
            }

            //finally  send back the updated data of the Post
            await feedPostEntityV1.updatePost(feedUUID, payload);

            async function updateHashTags(hashTags: AcceptAny, postData: AcceptAny) {
                const existingHashtags = postData.hashTags.map((tag: { hashtag: AcceptAny }) => tag.hashtag);
                const newHashTagsToAdd = hashTags.filter((tag: AcceptAny) => !existingHashtags.includes(tag));
                const unchangedHashtags = existingHashtags.filter((tag: string) => hashTags.includes(tag));
                const hashtagsToRemove = postData.hashTags
                    .filter((tag: { hashtag: string }) => !hashTags.includes(tag.hashtag))
                    .map((tag: { _id: AcceptAny }) => tag._id);

                let updatedHashTags: HashTag[] = [];
                const newhashTagPromises = newHashTagsToAdd.map(async (tag: string) => {
                    const existingTag = await hashTagEntityV1.getHashTagByName(tag);
                    if (existingTag) {
                        await hashTagEntityV1.incrementTagCount(existingTag._id);
                        updatedHashTags.push({ _id: existingTag._id, hashtag: tag });
                    } else {
                        const newTag = await hashTagEntityV1.createNewHashTag(tag);
                        updatedHashTags.push({ _id: newTag._id, hashtag: tag });
                    }
                });

                const updateHashTagPromises = hashtagsToRemove.map(async (id: string) => await hashTagEntityV1.decrementTagCount(id));

                await Promise.all([...newhashTagPromises, ...updateHashTagPromises]);
                updatedHashTags = [...updatedHashTags, ...unchangedHashtags];
                return updatedHashTags;
            }

            const finalResponse = utils.response.successResponse(res, {}, SuccessMessage.POST_UPDATED_SUCCESSFULLY);
            res.status(finalResponse.code).send(finalResponse);
        } catch (error) {
            const err = utils.response.errorResponse(res, error);
            res.status(err.code).send(err);
        }
    };

    private async ckeckCategories(categories: AcceptAny): Promise<void> {
        // Check if categories are valid
        if (categories && categories.length > 0) {
            for (const element of categories) {
                const isValid = await feedCategoryEntityV1.getCategoryById(element._id);
                if (!isValid) {
                    throw new CustomException(ExceptionMessage.INVALID_CATEGORY, HttpStatusMessage.BAD_REQUEST).getError();
                }
            }
        }
    }

    private async addNewSeason(season: AcceptAny): Promise<void> {
        const isExists = await feedSeasonEntityV1.getSeasonByName(season?.seasonName);
        if (isExists) {
            return { ...season, _id: isExists._id };
        }
        const seasonData = await feedSeasonEntityV1.addSeason(season);
        return { ...season, _id: seasonData._id };
    }
    // getFeed = async (req: Request, res: Response) => {
    //     try {
    //         const payload = req.query;
    //         const data = await feedEntityV1.getFeed(payload);
    //         const finalResponse = utils.response.successResponse(res, data, SuccessMessage.CONTENT_GET_SUCCESSFULLY);
    //         res.status(finalResponse.code).send(finalResponse);
    //     } catch (error) {
    //         const err = utils.response.errorResponse(res, error);
    //         res.status(err.code).send(err);
    //     }
    // };

    // getFeedDetail = async (req: Request, res: Response) => {
    //     try {
    //         const payload = req.query;
    //         const data = await feedEntityV1.feedDetail({ _id: payload.feedId as string });
    //         const finalResponse = utils.response.successResponse(res, data, SuccessMessage.SUCCESS);
    //         res.status(finalResponse.code).send(finalResponse);
    //     } catch (error) {
    //         const err = utils.response.errorResponse(res, error);
    //         res.status(err.code).send(err);
    //     }
    // };
}

export const feedControllerV1 = new FeedController();
