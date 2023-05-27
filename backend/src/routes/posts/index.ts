import { Router } from 'express';

import PostModel from '../../model/Post';
import auth from '../../middleware/auth';
import { checkPostData } from './validations';
import handleErrors from '../../lib/handleErrors';
import checkObjectId from '../../lib/checkObjectId';
import { notFound } from '../../lib/i18nResources';
import CategoryModel from '../../model/Category';
import TagModel from '../../model/Tag';


const routes = Router();


/**
 * Retrieve all posts from the database
 */
routes.get('/', async (req, res) => {
    try {
        // todo :: need to clear after create router for category and tag
        await CategoryModel.find();
        await TagModel.find();
        const posts = await PostModel
            .find()
            .populate([
                { path: 'author', select: 'name' },
                { path: 'categories', select: 'title' },
                { path: 'tags', select: 'title' },
            ])
            .select('-description -comments')
            .sort({ createdAt: -1 });

        return res.status(200).send(posts);
    } catch (err) {
        handleErrors(err, req, res);
    }
});

/**
 * get post by id
 */
routes.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const result = checkObjectId(id, req.t);

        // send error response
        if (result.err) return res.status(400).send({ msg: result.msg });

        // query on db
        const post = await PostModel
            .findById(result.id)
            .populate([
                { path: 'author', select: 'name' },
                { path: 'categories', select: 'title' },
                { path: 'tags', select: 'title' }
            ]);

        // send error response
        if (!post) return res.status(404).send({ msg: req.t(notFound) });

        console.log(post);
        return res.status(200).send(post);
    } catch (err) {
        handleErrors(err, req, res);
    }
});

/**
 * create new post by admin users
 */
routes.post('/', auth, async (req, res) => {
    try {
        const { body } = req;

        const validateBody = await checkPostData(body, req.t);
        // send error response
        if ('err' in validateBody) return res.status(400).send({ msg: validateBody.msg });

        const newPost = new PostModel({
            title: body.title,
            description: body.description,
            abstract: body.abstract,
            author: req.user._id
        });
        await newPost.save();

        return res.status(201).send({ _id: newPost._id });
    } catch (err) {
        handleErrors(err, req, res);
    }
});


export default routes;
