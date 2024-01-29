import { Request, Response, NextFunction } from 'express';
import { db } from '../model';
import { Op } from 'sequelize';
const User = db.User;
const Lang = db.Lang;
const Room = db.Room;
const MypageImage = db.MypageImages;

export const getPersonalRooms = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const userid = req.session.userid;
    if (!userid || userid.length < 4) {
        return res.json({
            msg: `Something Went Wrong! Please try it later!`,
            isError: true,
        });
    }

    let result;
    try {
        result = await Room.findAll({
            where: {
                [Op.or]: [{ userid: userid }, { useridTo: userid }],
                [Op.not]: [{ useridTo: 'monoChat' }],
            },
        });
    } catch (err) {
        return next(err);
    }
    res.json({
        personalRooms: result,
        isError: false,
    });
};

export const getMonoRooms = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const userid = req.session.userid;
    if (!userid || userid.length < 4) {
        return res.json({
            msg: `Something Went Wrong! Please try it later!`,
            isError: true,
        });
    }

    let result;
    try {
        result = await Room.findAll({
            where: {
                useridTo: 'monoChat',
            },
        });
    } catch (err) {
        return next(err);
    }
    res.json({
        monoRooms: result,
        isError: false,
    });
};
