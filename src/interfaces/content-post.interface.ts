// eslint-disable-next-line @typescript-eslint/no-namespace, @typescript-eslint/no-unused-vars
declare namespace ContentPostRequest {
    export interface CreateRequest {
        postUUID: string;
        pictureUrls: string[];
        videoUrls?: string[];
        userID: string;
        caption?: string;
        hashTags: any[];
        taggedUsers: [];
        visibility: number;
        underEighteen: boolean;
        warning?: number[];
        categories: any[];
        season?: any;
        textCommentsEnabled: boolean;
        voiceComments: {
            enabled: boolean;
            amount: number;
        };
        doubleMonetisations: {
            enabled: boolean;
            amount: number;
        };
    }
    export interface EditRequest {
        postUUID: string;
        pictureUrls: string[];
        videoUrls?: string[];
        userID: string;
        caption?: string;
        hashTags: any[];
        taggedUsers: [];
        visibility: number;
        underEighteen: boolean;
        warning?: number[];
        categories: any[];
        season?: any;
        textCommentsEnabled: boolean;
        voiceComments: {
            enabled: boolean;
            amount: number;
        };
        doubleMonetisations: {
            enabled: boolean;
            amount: number;
        };
    }
    export interface DetailRequest {
        _id: string;
    }
}
