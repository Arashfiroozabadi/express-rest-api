import { Router } from 'express';

import upload from '../../lib/upload';
import { requireFile } from '../../lib/i18nResources';


const routes = Router();

const postPhotos = upload.single('photo');

routes.post('/posts', async (req, res) => {
    postPhotos(req, res, err => {
        if (!req.file) {
            return res.status(400).send({ msg: req.t(requireFile) });
        }
        if (err) {
            const msg = err.code ? req.t(err.code) : err.message ?? err;
            res.status(400).send({ msg: msg });
        } else {
            res.status(201).send(req.fileName);
        }
    });
});

export default routes;