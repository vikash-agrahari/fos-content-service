import { Kafka, Admin, KafkaConfig } from 'kafkajs';
import { KAFKA_CONFIG } from '../../common/constants';
import { config } from '../aws/secret-manager';
import { Config } from '../../interfaces/config';

export class KafkaManager {
    protected kafka: Kafka;
    private admin: Admin;
    constructor() {
        this.kafka = new Kafka(this.getConfiguration());

        this.admin = this.kafka.admin();
    }

    /**
     * @description Fetch Configuration for Kafka
     * @returns {KafkaConfig}
     */
    getConfiguration(): KafkaConfig {
        const creds: KafkaConfig = {
            clientId: <string>config.get(Config.KAFKA_CLIENT_ID),
            brokers: [
                <string>config.get(Config.KAFKA_BROKER_1),
                <string>config.get(Config.KAFKA_BROKER_2),
                <string>config.get(Config.KAFKA_BROKER_3),
            ],
            retry: {},
        };
        return creds;
    }

    /**
     * @description Create the topic if it has not been already created.
     */
    async createTopics() {
        try {
            const topicConfig = {
                topics: Object.values(KAFKA_CONFIG.TOPICS),
            };
            console.log('Creating', topicConfig);
            const res = await this.admin.createTopics(topicConfig);
            console.log('Kafka Topic Creation ::', res);
        } catch (error) {
            console.error('Kafka Error Topic Creation', error);
        }
    }

    /**
     * @description Read Metadata for Created Topics
     */
    async metadataOfTopics() {
        try {
            const metadata = await this.admin.fetchTopicMetadata();
            console.log('Kafka Topics Metadata ::', JSON.stringify(metadata));
        } catch (error) {
            console.error('Kafka Error Fetching Metadata', error);
        }
    }

    /**
     * @description Open Connection
     */
    async connectToAdmin() {
        try {
            await this.admin.connect();
        } catch (error) {
            console.error('Failed to connect to Kafka.', error);
        }
    }

    /**
     * @description Close Connection
     */
    async disconnectFromAdmin() {
        await this.admin.disconnect();
    }
}
