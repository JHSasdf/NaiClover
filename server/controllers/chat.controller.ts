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

    let results;
    try {
        results = await Room.findAll({
            where: {
                [Op.or]: [{ userid: userid }, { useridTo: userid }],
                [Op.not]: [{ useridTo: 'monoChat' }],
            },
        });
        for (const result of results) {
            const existingUserid = await User.findOne({
                where: { userid: result.dataValues.userid },
                attributes: ['name'],
            });

            const existingUseridTo = await User.findOne({
                where: { userid: result.dataValues.useridTo },
                attributes: ['name'],
            });

            const myUserNameData = await User.findOne({
                where: { userid: userid },
                attributes: ['name'],
            });
            const myUserName = myUserNameData.dataValues.name;

            const existingArr = [
                existingUserid.dataValues.name,
                existingUseridTo.dataValues.name,
            ];

            const final = existingArr.filter((elem) => {
                return elem !== myUserName;
            });
            result.dataValues.realRoomName = final.toString();

            const pathData = await User.findOne({
                where: { name: result.dataValues.realRoomName },
                attributes: ['name'],
                include: [
                    {
                        model: MypageImage,
                        attributes: ['path'],
                    },
                ],
            });
            result.dataValues.path = pathData.dataValues.MypageImage;
        }
    } catch (err) {
        return next(err);
    }
    res.json({
        personalRooms: results,
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
