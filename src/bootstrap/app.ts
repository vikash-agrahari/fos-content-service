import express, { Express } from 'express';
import cors from 'cors';
import { config } from '../providers/aws/secret-manager';
import { Config } from '../interfaces/config';
import * as dotenv from 'dotenv';
import { i18nLocale } from '../providers/locale/locale.service';
import { InvalidRoute } from '../middlewares';
dotenv.config();
export class App {
    private app: Express;
    private port: number = config.get(Config.USER_APP_PORT);
    private contextPath: string = config.get(Config.USER_APP_CONTEXT_PATH);

    constructor() {
        this.startApp();
    }

    /**
     * @description Steps to Start the Express Sever
     */
    private startApp() {
        this.app = express();
        this.loadGlobalMiddlewares();
        this.loadRoutes();
        this.initializeServer();
    }

    /**
     * @description Load global Middlewares
     */
    private loadGlobalMiddlewares() {
        this.app.use(express.json());
        this.app.use(cors());
        this.app.use(i18nLocale);
    }

    /**
     * @description Load All Routes
     */
    private loadRoutes() {
        //  this.app.use(this.contextPath, routes.loadAllRoutes());
        this.app.use(InvalidRoute);
    }

    /**
     * @description Initiate Express Server
     */
    private initializeServer() {
        this.app.listen(this.port, this.callback);
    }

    /**
     * @description handler for Express server when initializing server
     */
    private callback = () => {
        console.log(`Server listing on port: ${this.port}`);
    };
}
