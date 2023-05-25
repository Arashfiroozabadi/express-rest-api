import { Router } from 'express';
import { ObjectId } from 'bson';
import * as yup from 'yup';

import PostModel from '../../model/Post';
import { IPost } from '../../interfaces';
const routes = Router();

async function checkPostData(post: IPost): Promise<any> {
    const validationSchema = yup.object({
        title: yup.string().required('title is required'),
        description: yup.string().required('description is required'),
        abstract: yup.string().required('abstract is required'),
        author: yup.string().test('valid-object-id', 'Invalid Object ID', (value) => {
            return ObjectId.isValid(value);
        })
    });
    return validationSchema.validate(post)
        .then(result => result)
        .catch(err => {
            return {
                err: true,
                msg: err.errors.join(', ')
            };
        });
}

/**
 * Retrieve all posts from the database
 */
routes.get('/', async (req, res) => {
    const posts = await PostModel.find();
    return res.status(200).send({ posts });
});


routes.post('/', async (req, res) => {
    const { body } = req;

    const validateBody = await checkPostData(body);
    // send error response
    if (validateBody.err) return res.status(400).send({ msg: validateBody.msg });

    const newPost = new PostModel({ body });

    return res.status(201).send({ _id: newPost._id });
});


export default routes;
