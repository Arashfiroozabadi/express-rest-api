import { Router } from 'express';

import PostModel from '../../model/Post';
import auth from '../../middleware/auth';
import { checkPostData } from './validations';
import handleErrors from '../../lib/handleErrors';
import checkObjectId from '../../lib/checkObjectId';
import { accessDenied, notFound } from '../../lib/i18nResources';
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
                { path: 'tags', select: 'title' }
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
            author: req.user._id,
            categories: body.categories,
            tags: body.tags,
            readingTime: body.readingTime,
            photo: body.photo,
            status: body.status
        });
        await newPost.save();

        return res.status(201).send({ _id: newPost._id });
    } catch (err) {
        handleErrors(err, req, res);
    }
});

/**
 * edit post by id
 */
routes.put('/:id', auth, async (req, res) => {
    try {
        const { id } = req.params;
        const { body } = req;
        const result = checkObjectId(id, req.t);

        // send error response
        if (result.err) return res.status(400).send({ msg: result.msg });

        // validate request body
        const validateBody = await checkPostData(body, req.t);
        // send error response
        if ('err' in validateBody) return res.status(400).send({ msg: validateBody.msg });

        // query on db
        const post = await PostModel.findById(result.id);

        // send error response
        if (!post) return res.status(404).send({ msg: req.t(notFound) });
        if (post.author + '' !== req.user._id + '') return res.status(403).send({ msg: req.t(accessDenied) });

        post.title = body.title;
        post.description = body.description;
        post.abstract = body.abstract;
        post.categories = body.categories;
        post.tags = body.tags;
        post.readingTime = body.readingTime;
        post.photo = body.photo;
        post.status = body.status;
        await post.save();

        return res.status(201).send({ msg: 'ok' });
    } catch (err) {
        handleErrors(err, req, res);
    }
});

/**
 * delete post by id
 */
routes.delete('/:id', auth, async (req, res) => {
    try {
        const { id } = req.params;
        const result = checkObjectId(id, req.t);

        // send error response
        if (result.err) return res.status(400).send({ msg: result.msg });

        // query to find post
        const post = await PostModel.findById(result.id);

        // send error response
        if (!post) return res.status(404).send({ msg: req.t(notFound) });
        if (post.author + '' !== req.user._id + '') return res.status(403).send({ msg: req.t(accessDenied) });

        // query to delete post
        await PostModel.findByIdAndDelete(id);

        return res.status(201).send({ msg: 'ok' });
    } catch (err) {
        handleErrors(err, req, res);
    }
});


export default routes;
