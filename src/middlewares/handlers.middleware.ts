import { Response, Request } from 'express';
import { HttpStatusMessage, ExceptionMessage } from '../interfaces/enum';
import { utils } from '../providers/utils/utils';

/** handles invalid route message */
export const InvalidRoute = (req: Request, res: Response) => {
    const error = utils.response.errorResponse(
        res,
        { message: ExceptionMessage.INVALID_ROUTE },
        ExceptionMessage.INVALID_ROUTE,
        HttpStatusMessage.NOT_FOUND
    );
    res.status(error.code).send(error);
};
