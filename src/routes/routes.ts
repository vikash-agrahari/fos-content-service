import { Server } from '@grpc/grpc-js';
import { routesV1 } from './v1/v1.routes';
import { Router } from 'express';

class Routes {
    private route: Router;

    constructor() {
        this.route = Router();
        this.routeMiddlewares();
    }
    private routeMiddlewares() {
        this.route.use('/', (req, res, next) => {
            console.log('');
            console.log('*************************REQUEST START*****************************');
            console.log(`NEW REQUEST ---> ${req.method} ${req.originalUrl}`);
            console.log('req Type=======>', req.method.toUpperCase());
            console.log('req Path=======>', req.path);
            console.log('req Body=======>', req.body);
            console.log('req Params=====>', req.params);
            console.log('req Query======>', req.query);
            console.log('Authorization======>', req.headers.authorization);
            console.log('*********************REQUEST ENDS********************************');

            next();
        });
    }
    /**
     * @description Load All Services
     * @param {Server} grpcServer
     * @param authPackage
     */
    loadAllServices(grpcServer: Server, providerPackage: any) {
        //  routesV1.loadAllV1Services(grpcServer, providerPackage);
    }

    /**
     * @description Load All Routes
     */
    loadAllRoutes() {
        this.route.use('/v1', routesV1.loadAllRoutes());
        return this.route;
    }
}

export const routes = new Routes();
