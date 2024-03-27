import {
    SecretsManagerClient,
    SecretsManagerClientConfig,
    GetSecretValueCommand,
    GetSecretValueCommandOutput,
} from '@aws-sdk/client-secrets-manager';
import { ENV } from '../../interfaces/enum';
import { AcceptAny } from '../../interfaces/types';
import { Config } from '../../interfaces/config';
import * as dotenv from 'dotenv';
dotenv.config();

class AWSSecretManagerProvider {
    private client: SecretsManagerClient;
    private secrets: AcceptAny;
    private env: string;
    constructor() {
        this.env = <string>process.env.NODE_ENV;
        this.initializeSecretManager();
    }

    /**
     * @description Initiate Secret Manager
     */
    private initializeSecretManager() {
        try {
            this.client = new SecretsManagerClient(this.getConfiguration());
        } catch (error) {
            console.log('Unable to Connect Error::', error);
        }
    }

    /**
     * @description Fetch Configuration for secret Manager
     * @returns {SecretsManagerClientConfig}
     */
    private getConfiguration(): SecretsManagerClientConfig {
        const creds: SecretsManagerClientConfig = {};
        creds.region = <string>process.env.AWS_DEFAULT_REGION;
        if (this.env == ENV.LOCAL) {
            creds.credentials = {
                accessKeyId: <string>process.env.AWS_ACCESS_KEY_ID,
                secretAccessKey: <string>process.env.AWS_SECRET_ACCESS_KEY,
            };
        }

        return creds;
    }

    /**
     * @description Load creds from Secret Manager
     */
    async loadCreds() {
        try {
            const loadSecret: GetSecretValueCommandOutput = await this.client.send(
                new GetSecretValueCommand({
                    SecretId: <string>process.env.AWS_SECRET_NAME,
                })
            );

            this.secrets = JSON.parse(<string>loadSecret.SecretString);
        } catch (error) {
            console.log('Unable to Load credentials AWS Error', error);
        }
    }

    /**
     * @description Fetch Config value by key name
     * @param {string} key
     * @returns
     */
    get(key: Config) {
        return this.env == ENV.LOCAL ? process.env[key] : this.secrets?.[key];
    }
}

export const config = new AWSSecretManagerProvider();
