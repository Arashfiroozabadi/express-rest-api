import { Router } from 'express';
import userRoutes from './users';
import postRoutes from './posts';
import categoryRoutes from './categories';
import tagRoutes from './tags';

const routes = Router();

routes.get('/')
    .use('/api/users', userRoutes)
    .use('/api/posts', postRoutes)
    .use('/api/categories', categoryRoutes)
    .use('/api/tags', tagRoutes);


export default routes;
