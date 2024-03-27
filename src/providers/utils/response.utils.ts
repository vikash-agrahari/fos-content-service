import { ExceptionMessage, HttpStatusCode, HttpStatusMessage } from '../../interfaces/enum';
import { GrpcResponse, HttpResponse } from '../../interfaces/global.interface';
import { AcceptAny } from '../../interfaces/types';
import { Response } from 'express';
import { utils } from './utils';

export class ResponseUtils {
    /**
     * @description Handle data we received from another service
     * @param {GrpcResponse} res Data we receive from service
     * @returns {HttpResponse}
     */
    grpcResponseHandler(res: GrpcResponse): HttpResponse {
        const response: HttpResponse = {
            code: res.code,
            status: res.status,
            timestamp: res.timestamp,
            data: res.data ? JSON.parse(res.data) : null,
            error: res.error ? JSON.parse(res.error) : null,
        };

        return response;
    }

    /**
     * @description Construct Success Response Object
     * @param {Record<string, AcceptAny>} data Actual Data to be Provided in Response
     * @param {number} status Status Code for Response
     * @param {string} statusMsg Status Msg for Response
     * @returns {HttpResponse} Response Object
     */
    successResponse(
        res: Response,
        data: AcceptAny,
        message: string = HttpStatusMessage.OK,
        status: string = HttpStatusMessage.OK
    ): HttpResponse {
        console.log(message);
        const response: HttpResponse = {
            code: this.getStatusCode(<keyof typeof HttpStatusCode>status),
            status: status,
            message: this.localizedMessage(res, message),
            timestamp: new Date().getTime(),
            data: data,
            error: null,
        };
        return response;
    }

    /**
     * @description Construct Error Response Object
     * @param {HttpException} error Error Object
     * @param {number} status Status Code for Response
     * @param {string} statusMsg Status Msg for Response
     * @returns {HttpResponse} Error Response Object
     */
    errorResponse(
        res: Response,
        error: AcceptAny,
        message: AcceptAny = ExceptionMessage.SOMETHING_WENT_WRONG,
        status: HttpStatusMessage = HttpStatusMessage.BAD_REQUEST
    ): HttpResponse {
        let ErrorResponse: HttpResponse = {
            code: error?.code || this.getStatusCode(<keyof typeof HttpStatusCode>status),
            status: error?.status || status,
            message: this.localizedMessage(res, error?.message || message),
            timestamp: new Date().getTime(),
            data: {},
            error: error.data || error,
        };
        if (ErrorResponse.code.toString().length > 3) {
            utils.consolelog(
                '********************* INTERNAL SERVER ERROR *************************',
                ErrorResponse,
                false
            );
            status = HttpStatusMessage.INTERNAL_SERVER_ERROR;
            message = ExceptionMessage.INTERNAL_SERVER_ERROR;
            ErrorResponse = {
                code: this.getStatusCode(<keyof typeof HttpStatusCode>status),
                status: status,
                message: this.localizedMessage(res, message),
                timestamp: new Date().getTime(),
                data: null,
                error: {},
            };
        }

        return ErrorResponse;
    }

    /**
     * @description Construct Success Response for Grpc Request
     * @param {Record<string, AcceptAny>} data Actual Data to be Provided in Response
     * @param {number} status Status Code for Response
     * @param {string} statusMsg Status Msg for Response
     * @returns {HttpResponse} Response Object
     */
    grpcSuccessResponse(
        data: Record<string, AcceptAny>,
        status: HttpStatusMessage = HttpStatusMessage.OK
    ): GrpcResponse {
        const response: GrpcResponse = {
            code: this.getStatusCode(<keyof typeof HttpStatusCode>status),
            status: status,
            timestamp: new Date().getTime(),
            data: JSON.stringify(data),
            error: '',
        };
        return response;
    }

    /**
     * @description Construct Error Response for Grpc Request
     * @param {HttpException} error Error Object
     * @param {number} status Status Code for Response
     * @param {string} statusMsg Status Msg for Response
     * @returns {HttpResponse} Error Response Object
     */
    grpcErrorResponse(
        error: AcceptAny,
        status: HttpStatusMessage = HttpStatusMessage.BAD_REQUEST
    ): GrpcResponse {
        const ErrorResponse: GrpcResponse = {
            code: this.getStatusCode(<keyof typeof HttpStatusCode>status),
            status: status,
            timestamp: new Date().getTime(),
            data: '',
            error: JSON.stringify(error),
        };
        return ErrorResponse;
    }

    getStatusCode(code: keyof typeof HttpStatusCode): number {
        return HttpStatusCode[code] || HttpStatusCode.BAD_REQUEST;
    }

    /**
     * @description This method is used to send success response in localized formate (en or mn)
     * @param { Response } res
     * @param { any } response
     * @returns localized success response
     */
    localizedSuccessResponse(res: Response, response: any) {
        if (response.message) {
            response.message = res.__(response.message);
        }
        return response;
    }

    /**
     * @description This method is used to send error response in localized formate (en or mn)
     * @param { Response } res
     * @param { any } error
     * @returns localized error response
     */
    localizedErrorResponse(res: Response, error: any) {
        if (error?.message) {
            error.message = res.__(error.message);
        }
        return error;
    }

    localizedMessage(res: Response, message: string) {
        return res.__(message);
    }
}
