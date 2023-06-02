import { Router } from 'express';
import userRoutes from './users';
import postRoutes from './posts';
import categoryRoutes from './categories';
import tagRoutes from './tags';
import uploadRoutes from './uploads';

const routes = Router();

routes.get('/')
    .use('/api/users', userRoutes)
    .use('/api/posts', postRoutes)
    .use('/api/categories', categoryRoutes)
    .use('/api/tags', tagRoutes)
    .use('/api/uploads', uploadRoutes);


export default routes;
