import { mongo } from '../providers/database/mongo.connection';
import { App } from './app';
import { Grpc } from './grpc';
import { KafkaManager } from '../providers/kafka/kafka';

/**
 * @description Start the grpc and Express server
 */
export class Bootstrap {
    private gRPC: Grpc;
    private app: App;
    private kafka: KafkaManager;
    constructor() {
        this.startApplication();
    }

    private async startApplication() {
        mongo.initiateMongoConnection();
        this.gRPC = new Grpc();
        this.app = new App();
    }
}
