import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import swaggerUi from 'swagger-ui-express';

import * as swaggerDocument from './swagger';

import routes from './routes';
import connectToDB from './lib/connectToDB';

const NODE_ENV = process.env.NODE_ENV;
const PORT = process.env.PORT;

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
    }

    routes() {
        this.server.use(routes);
    }
}

export default new App().server;
