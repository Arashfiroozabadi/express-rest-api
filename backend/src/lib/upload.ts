import multer from 'multer';
import { Request } from 'express';
import * as path from 'path';

import { onlyAcceptImage, requireFile } from './i18nResources';

const MAX_SIZE = parseInt(process.env.MAX_FILE_SIZE as string);

export class MulterError extends Error {
    constructor(message: string) {
        super(message);

        this.name = 'MulterError';
    }
}

const storage = multer.diskStorage({
    destination: function(req, file, cb: any) {
        if (!file) {
            cb(new MulterError(req.t(requireFile))); // Reject the file
        }
        cb(null, 'uploads/');
    },
    filename: function(req, file, cb) {

        const extension = path.extname(file.originalname);
        const uniqueSuffix = Date.now() + '' + Math.round(Math.random() * 1E9);

        const fileName = file.fieldname + '-' + uniqueSuffix + extension;

        cb(null, fileName);
        req.fileName = fileName;
    }
});


const fileFilter = function(req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) {
    if (file.mimetype.startsWith('image/')) {
        cb(null, true); // Accept the file
    } else {
        cb(new MulterError(req.t(onlyAcceptImage))); // Reject the file
    }
};

const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: { fileSize: MAX_SIZE }
});

export default upload;