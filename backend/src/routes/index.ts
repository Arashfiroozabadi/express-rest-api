import { Router } from 'express';
import postRoutes from './posts'
const routes = Router();

routes.get('/').use('/api/posts',postRoutes);


export default routes;