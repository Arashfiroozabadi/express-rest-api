import jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';

import UserModel from '../model/User';
import { notAuth } from '../lib/i18nResources';

const JWT_KEY = process.env.JWT_KEY as string;

const auth = async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (req.header('Authorization') && req.header('Authorization') !== 'null') {
            const token = req.header('Authorization')?.replace('Bearer ', '');
            if (token && token !== 'null') {
                const decoded = jwt.verify(token, JWT_KEY) as { _id: string, exp: number };
                console.log(decoded.exp);
                let user = await UserModel.findOne({ _id: decoded._id, token });

                // send error response
                if (!user) return res.status(401).send({ error: req.t(notAuth) });
                console.log(user.token);
                user.generateAuthToken();
                console.log(user.token);

                req.user = user;
                next();
            }
        } else {
            return res.status(401).send({ error: req.t(notAuth) });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send({ error });
    }
};

export default auth;