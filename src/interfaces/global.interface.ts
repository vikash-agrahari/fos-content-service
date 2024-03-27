import { Request } from 'express';
import { AcceptAny } from './types';

interface Response {
    status: string;
    code: number;
    timestamp: number;
}

export interface GrpcResponse extends Response {
    data: string;
    error: string;
}

export interface INODEMAILER_CONFIG {
    service: string;
    auth: {
        user: string;
        pass: string;
    };
}

export interface Message {
    message: string | null;
}
export interface HttpResponse extends Response {
    data: Record<string, AcceptAny> | null;
    error: Record<string, AcceptAny> | null;
    message?: string | null;
}

export interface CustomRequest extends Request {
    cognitoUserData?: {
        [key: string]: any;
    };
    userData?: {
        [key: string]: any;
    };
    sessionData?: {
        [key: string]: any;
    };
}
