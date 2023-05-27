import { Router } from 'express';
import postRoutes from './posts';
import userRoutes from './users';

const routes = Router();

routes.get('/')
    .use('/api/posts', postRoutes)
    .use('/api/users', userRoutes);

export default routes;
