import { Request, Response, NextFunction } from 'express';
import { db } from '../model';
const User = db.User;
const Follow = db.Follow;

export async function follow(
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void | Response> {
    const { userid, followId } = req.body;
    console.log('userid: ', userid);
    console.log('followId: ', followId);
    try {
        const check = await User.findOne({ where: { userid: followId } });
        if (!check) {
            try {
                await Follow.create({ userid: followId, followerId: userid });
                return res.json({
                    msg: 'complete',
                    result: true,
                });
            } catch (error) {
                return res.json({
                    msg: error,
                    result: false,
                });
            }
        }
    } catch (error) {
        return res.json({
            msg: error,
            result: false,
        });
    }
}

export async function unfollow(
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void | Response> {
    const { userid, followId } = req.body;
    console.log('userid: ', userid);
    console.log('followId: ', followId);
    try {
        const check = await User.findOne({ where: { userid: followId } });
        if (!check) {
            try {
                await Follow.destroy({ userid: followId, followerId: userid });
                return res.json({
                    msg: 'complete',
                    result: true,
                });
            } catch (error) {
                return res.json({
                    msg: error,
                    result: false,
                });
            }
        }
    } catch (error) {
        return res.json({
            msg: error,
            result: false,
        });
    }
}
