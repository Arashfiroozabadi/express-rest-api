import { Router } from 'express';

import TagModel from '../../model/Tag';
import auth from '../../middleware/auth';
import { checkCategoryData } from './validations';
import handleErrors from '../../lib/handleErrors';
import checkObjectId from '../../lib/checkObjectId';
import { notFound } from '../../lib/i18nResources';


const routes = Router();


/**
 * get all tags
 */
routes.get('/', async (req, res) => {
    try {
        // query to find data
        const tags = await TagModel
            .find()
            .sort({ createdAt: -1 });

        // send response
        return res.status(200).send(tags);
    } catch (err) {
        handleErrors(err, req, res);
    }
});

/**
 * get Tag by id
 */
routes.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const result = checkObjectId(id, req.t);

        // send error response
        if (result.err) return res.status(400).send({ msg: result.msg });

        // query on db
        const Tag = await TagModel.findById(result.id);

        // send error response
        if (!Tag) return res.status(404).send({ msg: req.t(notFound) });

        return res.status(200).send(Tag);
    } catch (err) {
        handleErrors(err, req, res);
    }
});

/**
 * create new Tag by admin users
 */
routes.post('/', auth, async (req, res) => {
    try {
        const { body } = req;

        const validateBody = await checkCategoryData(body, req.t);
        // send error response
        if ('err' in validateBody) return res.status(400).send({ msg: validateBody.msg });

        const newCategory = new TagModel({
            title: body.title
        });
        await newCategory.save();

        return res.status(201).send({ _id: newCategory._id });
    } catch (err) {
        handleErrors(err, req, res);
    }
});

/**
 * edit Tag by id
 */
routes.put('/:id', auth, async (req, res) => {
    try {
        const { id } = req.params;
        const { body } = req;
        const result = checkObjectId(id, req.t);

        // send error response
        if (result.err) return res.status(400).send({ msg: result.msg });

        // validate request body
        const validateBody = await checkCategoryData(body, req.t);
        // send error response
        if ('err' in validateBody) return res.status(400).send({ msg: validateBody.msg });

        // query on db
        const tag = await TagModel.findByIdAndUpdate(
            result.id,
            {
                title: body.title
            }
        );

        // send error response
        if (!tag) return res.status(404).send({ msg: req.t(notFound) });

        return res.status(201).send({ msg: 'ok' });
    } catch (err) {
        handleErrors(err, req, res);
    }
});

/**
 * delete Tag by id
 */
routes.delete('/:id', auth, async (req, res) => {
    try {
        const { id } = req.params;
        const result = checkObjectId(id, req.t);

        // send error response
        if (result.err) return res.status(400).send({ msg: result.msg });

        // query to delete Tag
        const tag = await TagModel.findByIdAndDelete(id);

        // send error response
        if (!tag) return res.status(404).send({ msg: req.t(notFound) });

        return res.status(201).send({ msg: 'ok' });
    } catch (err) {
        handleErrors(err, req, res);
    }
});


export default routes;
