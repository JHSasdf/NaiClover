import { Request, Response, NextFunction } from 'express';
import { db } from '../model';
const User = db.User;
const Follow = db.Follow;
import { User } from '../../client/src/types/types';

export async function follow(
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void | Response> {
    const { userid, followId } = req.body;
    console.log('userid: ', userid);
    console.log('followId: ', followId);
    try {
        const followCheck = await Follow.findOne({
            where: { userid: followId, followerId: userid },
        });
        if (!followCheck) {
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
        const followCheck = await Follow.findOne({
            where: { userid: followId, followerId: userid },
        });
        if (followCheck) {
            try {
                await Follow.destroy({
                    where: { userid: followId, followerId: userid },
                });
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

export async function followNumGet(
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void | Response> {
    let { userid } = req.query;
    try {
        let tempObj = await Follow.findAll({
            where: { followerId: userid },
        });
        let followingNumber: number = 0;
        let followerNumber: number = 0;
        tempObj.forEach((obj: object) => {
            followingNumber++;
        });
        tempObj = await Follow.findAll({
            where: { userid: userid },
        });
        tempObj.forEach((obj: object) => {
            followerNumber++;
        });
        return res.json({
            followingNumber,
            followerNumber,
            result: true,
        });
    } catch (error) {
        return res.json({
            msg: error,
            result: false,
        });
    }
}
export async function followListGet(
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void | Response> {
    let { userid } = req.query;
    try {
        let followingList: User[] = [];
        let followerList: User[] = [];
        let tempUser: User;
        let tempObj = await Follow.findAll({
            where: { followerId: userid },
        });
        for (const obj of tempObj) {
            tempUser = await User.findOne({ where: { userid: obj.userid } });
            followingList.push(tempUser);
        }
        tempObj = await Follow.findAll({
            where: { userid: userid },
        });
        for (const obj of tempObj) {
            tempUser = await User.findOne({ where: { userid: obj.userid } });
            followerList.push(tempUser);
        }
        return res.json({
            followingList,
            followerList,
            result: true,
        });
    } catch (error) {
        return res.json({
            msg: error,
            result: false,
        });
    }
}
