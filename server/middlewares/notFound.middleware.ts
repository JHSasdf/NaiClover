import { Request, Response } from 'express';

function notFoundHandler(req: Request, res: Response) {
    res.json({ msg: 'resources are not founded!', isError: true });
}

export = notFoundHandler;
