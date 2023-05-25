import express from 'express';
import morgan from 'morgan';

import routes from './routes';
import connectToDB from "@lib/connectToDB";

class App {
    public server;

    constructor() {
        this.server = express();

        this.middlewares();
        this.routes();

        connectToDB
            .then(() => {
                console.log('db connected')
            })
            .catch(err => {
                console.error(err)
            })
    }

    middlewares() {
        this.server.use(express.json());
        this.server.use(morgan('dev'))
    }

    routes() {
        this.server.use(routes);
    }
}

export default new App().server;