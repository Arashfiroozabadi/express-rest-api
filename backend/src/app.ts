import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import swaggerUi from 'swagger-ui-express';
import i18next from 'i18next';
import i18nextMiddleware from 'i18next-http-middleware';
import FilesystemBackend from 'i18next-node-fs-backend';
import sprintf from 'i18next-sprintf-postprocessor';

import * as swaggerDocument from './swagger';
import routes from './routes';
import connectToDB from './lib/connectToDB';
import i18nResources from './lib/i18nResources';

const NODE_ENV = process.env.NODE_ENV;
const PORT = process.env.PORT;
const i18nOptions = {
    initImmediate: false,
    lng: 'en',
    resources: i18nResources
};

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

        if (NODE_ENV === 'dev') {
            console.log(`swagger doc serve on http://localhost:${PORT}/swagger-doc`);
            this.server.use('/swagger-doc', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
        }


    }

    middlewares() {
        this.server.use(bodyParser.json());
        this.server.use(bodyParser.urlencoded({ extended: true }));
        this.server.use(morgan('dev'));
        i18next
            .use(i18nextMiddleware.LanguageDetector)
            .use(FilesystemBackend)
            .use(sprintf)
            .init(i18nOptions);

        this.server.use(i18nextMiddleware.handle(i18next, { removeLngFromUrl: false }));

    }

    routes() {
        this.server.use(routes);
    }
}

export default new App().server;
