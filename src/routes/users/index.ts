import { Router } from 'express';
import { ObjectId } from 'bson';

import UserModel from '../../model/User';
import auth from '../../middleware/auth';
import hashPass from '../../lib/hashPass';
import { checkNewUserData, checkUserLoginData } from './validations';
import handleErrors from '../../lib/handleErrors';
import { invalidPass, logout, userNotFound } from '../../lib/i18nResources';
import bcrypt from 'bcrypt';
import convertPhoneNumber from '../../lib/convertPhoneNumber';

const routes = Router();


routes.get('/me', auth, async (req, res) => {
    const responseData = {
        _id: req.user._id,
        name: req.user.name,
        email: req.user.email,
        phone: req.user.phone,
        token: req.user.token,
        createdAt: req.user.createdAt,
        updatedAt: req.user.updatedAt
    };
    res.status(200).send(responseData);
});

routes.post('/', async (req, res) => {
    const { body } = req;
    const validateBody = await checkNewUserData(body, req.t);

    // send error response
    if ('err' in validateBody) return res.status(400).send({ msg: validateBody.msg });

    try {
        const phone = convertPhoneNumber(body.phone);
        // create new user
        const newUser = new UserModel({
            name: body.name.toLowerCase(),
            email: body.email,
            phone,
            password: await hashPass(body.password)
        });
        await newUser.save();
        newUser.generateAuthToken();

        const responseData = {
            _id: newUser._id,
            name: newUser.name,
            email: newUser.email,
            phone: newUser.phone,
            token: newUser.token,
            createdAt: newUser.createdAt,
            updatedAt: newUser.updatedAt
        };

        return res.status(201).send(responseData);
    } catch (err: any) {
        console.error(err);
        handleErrors(err, req, res);
    }
});

routes.post('/login', async (req, res) => {
    const { body } = req;
    const validateBody = await checkUserLoginData(body, req.t);

    try {
        // send error response
        if ('err' in validateBody) return res.status(400).send({ msg: validateBody.msg });

        const filter = { phone: convertPhoneNumber(body.phone) };
        const user = await UserModel.findOne(filter);

        // send error response
        if (!user) return res.status(404).send({ msg: req.t(userNotFound) });

        // check user password
        let checkPass = await bcrypt.compare(body.password, user.password);
        // send error response
        if (!checkPass) return res.status(401).send({ msg: req.t(invalidPass) });

        user.generateAuthToken();

        const responseData = {
            _id: user._id,
            name: user.name,
            email: user.email,
            phone: user.phone,
            token: user.token,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt
        };
        res.status(201).send(responseData);
    } catch (err) {
        console.error(err);
        handleErrors(err, req, res);
    }
});

routes.post('/logout', auth, async (req, res) => {
    req.user.token = undefined;
    const user = req.user;
    await user.save();

    res.status(201).send({ msg: req.t(logout) });
});

export default routes;