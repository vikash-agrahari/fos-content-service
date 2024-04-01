import { Server } from '@grpc/grpc-js';
import { Router } from 'express';
import { contentRouteV1 } from './content.route';

class V1Routes {
    private route: Router;

    constructor() {
        this.route = Router();
    }
    /**
     * @description Load All Services
     * @param {Server} grpcServer
     * @param authPackage
     */
    loadAllV1Services(grpcServer: Server, userPackage: any) {
        // userGrpcRoutes.loadServiceDefinition(grpcServer, userPackage);
    }

    /**
     * @description Load All V1 User activity Routes
     */
    loadAllRoutes() {
        this.route.use('/content', contentRouteV1.loadContentRoutes());
        return this.route;
    }
}

export const routesV1 = new V1Routes();
