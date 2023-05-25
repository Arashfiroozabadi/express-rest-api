import { Router } from 'express';
import * as yup from 'yup';

import PostModel from '../../model/Post';

const routes = Router();
/**
 * Retrieve all posts from the database
 */
routes.get('/', async (req, res) => {
    const posts = await PostModel.find();
    return res.status(200).send({ posts });
});


routes.post('/', async (req, res) => {

});


export default routes;
