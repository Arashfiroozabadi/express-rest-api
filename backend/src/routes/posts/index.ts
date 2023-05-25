import { Router } from 'express';
import PostModel from '@model/Post';

const routes = Router();

routes.get('/', async (req, res) => {
    const posts = await PostModel.find();
    return res.status(200).send({ posts });
});

export default routes;
