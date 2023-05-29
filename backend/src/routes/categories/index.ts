import { Router } from 'express';

import CategoryModel from '../../model/Category';
import auth from '../../middleware/auth';
import handleErrors from '../../lib/handleErrors';
import checkObjectId from '../../lib/checkObjectId';
import { notFound } from '../../lib/i18nResources';
import { checkCategoryData } from './validations';


const routes = Router();


/**
 * get all categories
 */
routes.get('/', async (req, res) => {
    try {
        // query to find data
        const categories = await CategoryModel
            .find()
            .sort({ createdAt: -1 });

        // send response
        return res.status(200).send(categories);
    } catch (err) {
        handleErrors(err, req, res);
    }
});

/**
 * get category by id
 */
routes.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const result = checkObjectId(id, req.t);

        // send error response
        if (result.err) return res.status(400).send({ msg: result.msg });

        // query on db
        const category = await CategoryModel.findById(result.id);

        // send error response
        if (!category) return res.status(404).send({ msg: req.t(notFound) });

        return res.status(200).send(category);
    } catch (err) {
        handleErrors(err, req, res);
    }
});

/**
 * create new category by admin users
 */
routes.post('/', auth, async (req, res) => {
    try {
        const { body } = req;

        const validateBody = await checkCategoryData(body, req.t);
        // send error response
        if ('err' in validateBody) return res.status(400).send({ msg: validateBody.msg });

        const newCategory = new CategoryModel({
            title: body.title
        });
        await newCategory.save();

        return res.status(201).send({ _id: newCategory._id });
    } catch (err) {
        handleErrors(err, req, res);
    }
});

/**
 * edit category by id
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
        const category = await CategoryModel.findByIdAndUpdate(
            result.id,
            {
                title: body.title
            }
        );

        // send error response
        if (!category) return res.status(404).send({ msg: req.t(notFound) });

        return res.status(201).send({ msg: 'ok' });
    } catch (err) {
        handleErrors(err, req, res);
    }
});

/**
 * delete category by id
 */
routes.delete('/:id', auth, async (req, res) => {
    try {
        const { id } = req.params;
        const result = checkObjectId(id, req.t);

        // send error response
        if (result.err) return res.status(400).send({ msg: result.msg });

        // query to delete category
        const category = await CategoryModel.findByIdAndDelete(id);

        // send error response
        if (!category) return res.status(404).send({ msg: req.t(notFound) });

        return res.status(201).send({ msg: 'ok' });
    } catch (err) {
        handleErrors(err, req, res);
    }
});


export default routes;
