import { Options, PackageDefinition, loadSync } from '@grpc/proto-loader';
import { Server, GrpcObject, loadPackageDefinition, ServerCredentials } from '@grpc/grpc-js';
import path from 'path';
import { routes } from './../routes/routes';
import { GRPC } from './../common/constants';
import { config } from '../providers/aws/secret-manager';
import { Config } from '../interfaces/config';
import * as dotenv from 'dotenv';
dotenv.config();

export class Grpc {
    private grpcPort = config.get(Config.USER_SERVICE_PORT);
    // private protoFilePath = path.resolve(__dirname, +`user-service` + config.get(Config.PROTO_PATH) + `user.proto`);
    private protoFilePath = path.resolve(__dirname, +`user-service` + `${process.env.PROTO_PATH}` + `user.proto`);
    public userPackage: any;
    public grpcServer: Server;
    constructor() {
        this.startGrpcServer();
    }

    /**
     * @description Initiate Grpc Server
     */
    private startGrpcServer() {
        this.loadProtoFile();
        this.grpcServer = new Server();
        this.loadServiceDefinition();
        this.initializeGrpcServer();
    }

    /**
     * @description Load Proto file for User Service
     */
    private loadProtoFile(): void {
        console.log('process.cwd()', process.cwd());
        const protoOptions: Options = GRPC.PROTO_FILE_OPTIONS;

        const packageDefinition: PackageDefinition = loadSync(path.resolve(__dirname, this.protoFilePath), protoOptions);

        const grpcObject: GrpcObject = loadPackageDefinition(packageDefinition);
        this.userPackage = grpcObject.userPackage;
    }

    /**
     * @description Expose User services
     */
    private loadServiceDefinition(): void {
        routes.loadAllServices(this.grpcServer, this.userPackage);
    }

    /**
     * @description initialize Grpc Server
     */
    private initializeGrpcServer(): void {
        this.grpcServer.bindAsync(`0.0.0.0:${this.grpcPort}`, ServerCredentials.createInsecure(), this.grpcCallback);
    }

    /**
     * @description handler for Grpc server when initializing server
     * @param {Error} err
     * @param {number} port
     * @returns {void}
     */
    private grpcCallback = (err: Error | null, port: number): void => {
        if (err) {
            console.error(err);
            return;
        }
        this.grpcServer.start();
        console.log(`gRPC server listening on ${port}`);
    };
}
