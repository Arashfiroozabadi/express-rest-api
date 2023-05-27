import jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';
import moment from 'moment';
import UserModel from '../model/User';
import { notAuth } from '../lib/i18nResources';
import handleErrors from '../lib/handleErrors';

const JWT_KEY = process.env.JWT_KEY as string;

const auth = async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (req.header('Authorization') && req.header('Authorization') !== 'null') {
            const token = req.header('Authorization')?.replace('Bearer ', '');
            if (token && token !== 'null') {
                const decoded = jwt.verify(token, JWT_KEY) as { _id: string, exp: number };

                // const newDate = moment('2023-05-26T16:05:58+03:30');
                // const expireDate = moment(decoded.exp * 1000);
                // if (expireDate.diff(newDate, 'hours') < 8) {
                //
                // }

                let user = await UserModel.findOne({ _id: decoded._id, token });

                // send error response
                if (!user) return res.status(401).send({ msg: req.t(notAuth) });

                req.user = user;
                next();
            }
        } else {
            return res.status(401).send({ msg: req.t(notAuth) });
        }
    } catch (err: any) {
        if (err.name === 'TokenExpiredError') {
            return res.status(401).send({ msg: req.t('TokenExpiredError') });
        } else {
            handleErrors(err, req, res);
        }

    }
};

export default auth;