import { Options, PackageDefinition, loadSync } from '@grpc/proto-loader';
import { GRPC } from '../../common/constants';
import path from 'path';
import { GrpcObject, loadPackageDefinition } from '@grpc/grpc-js';
import { Observable } from 'rxjs';
import { GrpcResponse } from '../../interfaces/global.interface';
import { Config } from '../../interfaces/config';
import { config } from '../aws/secret-manager';

export class GrpcService {
    public package: any;
    constructor(protoFilename: string, packageName: string) {
        this.loadProtoFile(protoFilename, packageName);
    }

    /**
     * @description Load Proto file of Service
     */
    private loadProtoFile(protoFilename: string, packageName: string): void {
        const protoOptions: Options = GRPC.PROTO_FILE_OPTIONS;

        const packageDefinition: PackageDefinition = loadSync(
            path.resolve(__dirname, config.get(Config.PROTO_PATH) + `${protoFilename}`),
            protoOptions
        );

        const grpcObject: GrpcObject = loadPackageDefinition(packageDefinition);
        this.package = grpcObject[packageName];
    }

    /**
     * @description Invoke Grpc Service Method
     * @param service
     * @param method
     * @param payload
     * @returns {GrpcResponse}
     */
    protected invokeService<Type>(service: any, method: string, payload: Type): Observable<GrpcResponse> {
        try {
            return new Observable((subscriber: any) => {
                service[method](payload, (err: Error, res: any) => {
                    if (err) {
                        subscriber.error(err);
                    } else {
                        subscriber.next(res);
                    }
                });
            });
        } catch (error) {
            console.log('error in catch of invoke service', error);
            throw error;
        }
    }
}
