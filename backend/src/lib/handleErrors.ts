import { Request, Response } from 'express';

export default function(err: any, req: Request, res: Response) {
    console.error(err);
    if ('code' in err) {
        const code = err.code;
        return res.status(400).send({
            msg: req.t(code),
            field: err.keyValue
        });
    } else {
        return res.status(500).send(err);
    }
}