import { Router } from 'express';

import auth from '../../middleware/auth';
import handleErrors from '../../lib/handleErrors';
import checkObjectId from '../../lib/checkObjectId';
import { notFound } from '../../lib/i18nResources';
import { checkSubCategoryData } from './validations';

import SubCategoryModel from '../../model/SubCategoryModel';


const routes = Router();

/**
 * get all sub categories
 */
routes.get('/', async (req, res) => {
    try {
        // query to find data
        const subCategories = await SubCategoryModel
            .find()
            .sort({ createdAt: -1 });

        // send response
        return res.status(200).send(subCategories);
    } catch (err) {
        handleErrors(err, req, res);
    }
});

/**
 * edit sub category title
 */
routes.put('/:id', auth, async (req, res) => {
    try {
        const { id } = req.params;
        const { body } = req;

        const result = checkObjectId(id, req.t);

        // send error response
        if (result.err) return res.status(400).send({ msg: result.msg });

        // validate request body
        const validateBody = await checkSubCategoryData(body, req.t);
        // send error response
        if ('err' in validateBody) return res.status(400).send({ msg: validateBody.msg });

        // query on db
        const subCategory = await SubCategoryModel.findByIdAndUpdate(
            result.id,
            {
                title: body.title
            }
        );

        // send error response
        if (!subCategory) return res.status(404).send({ msg: req.t(notFound) });

        return res.status(201).send({ msg: 'ok' });

    } catch (err) {
        handleErrors(err, req, res);
    }
});

/**
 * delete sub category by id
 */
routes.delete('/:id', auth, async (req, res) => {
    try {
        const { id } = req.params;
        const result = checkObjectId(id, req.t);

        // send error response
        if (result.err) return res.status(400).send({ msg: result.msg });

        // query to delete category
        const category = await SubCategoryModel.findByIdAndDelete(id);

        // send error response
        if (!category) return res.status(404).send({ msg: req.t(notFound) });

        return res.status(201).send({ msg: 'ok' });
    } catch (err) {
        handleErrors(err, req, res);
    }
});


export default routes;
