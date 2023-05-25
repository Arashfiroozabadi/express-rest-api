import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import swaggerUi from 'swagger-ui-express';

import * as swaggerDocument from '../swagger.json';

import routes from './routes';
import connectToDB from './lib/connectToDB';


class App {
    public server;

    constructor() {
        this.server = express();

        this.middlewares();
        this.routes();

        connectToDB
            .then(() => {
                console.log('db connected');
            })
            .catch((err) => {
                console.error(err);
            });

        this.server.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
    }

    middlewares() {
        this.server.use(bodyParser.json());
        this.server.use(bodyParser.urlencoded({ extended: true }));
        this.server.use(morgan('dev'));
    }

    routes() {
        this.server.use(routes);
    }
}

export default new App().server;
