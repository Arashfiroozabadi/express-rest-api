import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import swaggerUi from 'swagger-ui-express';
import i18next from 'i18next';
import i18nextMiddleware from 'i18next-http-middleware';

import * as swaggerDocument from './swagger';
import routes from './routes';
import connectToDB from './lib/connectToDB';
import { initI18next } from './lib/i18nResources';
import multer from 'multer';

const NODE_ENV = process.env.NODE_ENV;
const PORT = process.env.PORT;

class App {
    public server;

    constructor() {
        this.server = express();

        connectToDB
            .then(() => {
                console.log('db connected');
            })
            .catch((err) => {
                throw err;
            });

        this.middlewares();
        this.routes();

        if (NODE_ENV === 'dev') {
            console.log(`swagger doc serve on http://localhost:${PORT}/swagger-doc`);
            this.server.use('/swagger-doc', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
        }

    }

    middlewares() {
        this.server.use(bodyParser.json());
        this.server.use(bodyParser.urlencoded({ extended: true }));
        this.server.use(morgan('dev'));

        initI18next().then();
        this.server.use(i18nextMiddleware.handle(i18next, { removeLngFromUrl: false }));
        
    }

    routes() {
        this.server.use(routes);
    }
}

export default new App().server;
