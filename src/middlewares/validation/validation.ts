import { NextFunction, Request, Response } from 'express';
import { utils } from '../../providers/utils/utils';
import { AcceptAny } from '../../interfaces/types';

class Validation {
    /**
     * @description Validate Body of Incoming Request
     * @param schema
     * @returns
     */
    body = (schema: AcceptAny) => {
        return async (req: Request, res: Response, next: NextFunction) => {
            const { error, value } = schema.validate(req.body);
            if (error) {
                const err = utils.response.errorResponse(res, {
                    message: error?.message || error?.details[0]?.message,
                });
                return res.status(err.code).send(err);
            }
            req.body = value;
            next();
        };
    };

    /**
     * @description Validate Param of Incoming Request
     * @param schema
     * @returns
     */
    params = (schema: AcceptAny) => {
        return async (req: Request, res: Response, next: NextFunction) => {
            const { error } = schema.validate(req.params);
            if (error) {
                const err = utils.response.errorResponse(res, {
                    message: error.details[0].message,
                });
                return res.status(err.code).send(err);
            }
            next();
        };
    };

    /**
     * @description Validate Qeury Param of Incoming Request
     * @param schema
     * @returns
     */
    queryParam = (schema: AcceptAny) => {
        return async (req: Request, res: Response, next: NextFunction) => {
            const { error } = schema.validate(req.query, { context: true });
            if (error) {
                const err = utils.response.errorResponse(res, {
                    message: error.details[0].message,
                });
                return res.status(err.code).send(err);
            }
            next();
        };
    };

    /**
     * @description Validate Header of Incoming Request
     * @param schema
     * @returns
     */
    headers = (schema: AcceptAny) => {
        return async (req: Request, res: Response, next: NextFunction) => {
            const { error } = schema.validate(req.headers);
            if (error) {
                const err = utils.response.errorResponse(res, {
                    message: error.details[0].message,
                });
                return res.status(err.code).send(err);
            }
            next();
        };
    };

    /**
     * @description Validate Request file of Incoming Request
     * @param schema
     * @returns
     */
    file = (schema: AcceptAny) => {
        return async (req: Request, res: Response, next: NextFunction) => {
            console.log(req.file);
            const { error } = schema.validate(req.file);
            if (error) {
                const err = utils.response.errorResponse(res, {
                    message: error.details[0].message,
                });
                return res.status(err.code).send(err);
            }
            next();
        };
    };
}

export const validate = new Validation();
