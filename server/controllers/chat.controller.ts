import { Request, Response, NextFunction } from 'express';
import { db } from '../model';
import { Op } from 'sequelize';
const User = db.User;
const Lang = db.Lang;
const Room = db.Room;

// room 보여주는 홈페이지에서 1:1 채팅방 목록 보여주는 함수
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
        }
    } catch (err) {
        return next(err);
    }

    // personalRooms.realRoomName이 1:1 채팅에서 상대방의 이름
    res.json({
        personalRooms: results,
        isError: false,
    });
};

// room 보여주는 홈페이지에서 모노 채팅방 목록 보여주는 함수
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
