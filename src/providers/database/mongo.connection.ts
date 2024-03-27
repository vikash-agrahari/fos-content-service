import mongoose, { ConnectOptions, Connection, createConnection } from 'mongoose';
import { config } from '../aws/secret-manager';
import { Config } from '../../interfaces/config';

// dotenv.config();
class MongoConnection {
    private conn: Connection;
    constructor() {
        this.initiateMongoConnection();
    }

    /**
     * @description MongoDb Connection
     */
    initiateMongoConnection() {
        if (!this.conn) {
            const options: ConnectOptions = {};
            this.conn = createConnection(this.getConnectionUri(), options);
            this.registerConnectionEvent();
            mongoose.set('debug', true);
        }
    }

    /**
     * @description Fetch Configuration for Mongo
     * @returns Mongo Connection string
     */
    getConnectionUri() {
        return <string>config.get(Config.MONGO_CONNECTION_URI);
    }

    /**
     * @description Register event to trace connection and Error from Mongo
     */
    private registerConnectionEvent() {
        this.conn.on('error', console.error.bind(console, 'MongoDB connection error:'));
        this.conn.once('open', () => {
            console.log('MongoDB connected successfully!,\nconnected to ', this.getConnectionUri());
        });
    }

    getConnection(): Connection {
        return this.conn;
    }
}

export const mongo = new MongoConnection();
