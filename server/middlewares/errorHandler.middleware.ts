import { Request, Response, NextFunction } from 'express';

function handleErrors(
    error: any,
    req: Request,
    res: Response,
    next: NextFunction
) {
    console.log(error);

    if (error.code === 404) {
        return res
            .status(404)
            .json({ msg: 'resources are not founded', isError: true });
    }

    return res.status(500).json({
        msg: 'Something went wrong. Please try again later',
        isError: true,
    });
}

export = handleErrors;
