import { Router } from 'express';
import userRoutes from './users';
import postRoutes from './posts';
import categoryRoutes from './categories';

const routes = Router();

routes.get('/')
    .use('/api/users', userRoutes)
    .use('/api/posts', postRoutes)
    .use('/api/categories', categoryRoutes);


export default routes;
