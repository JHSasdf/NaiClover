import { Request, Response, NextFunction } from 'express';
import { db } from '../model';
import { Op } from 'sequelize';
import sequelize from 'sequelize';
const User = db.User;
const Lang = db.Lang;
const Room = db.Room;
const Chat = db.Chat;
const ChatCount = db.ChatCount;

// room 보여주는 홈페이지에서 1:1 채팅방 목록 보여주는 함수
export const getPersonalRooms = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const userid = req.session.userid;
    if (!userid || userid.length < 4) {
        return res.status(401).json({
            msg: 'Please Login First!',
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
            include: [
                {
                    model: Chat,
                    order: [['createdAt', 'DESC']],
                    limit: 1,
                },
            ],
        });
        for (const result of results) {
            const existingUserid = await User.findOne({
                where: { userid: result.dataValues.userid },
                attributes: ['name', 'nation', 'profileImgPath'],
            });

            const existingUseridTo = await User.findOne({
                where: { userid: result.dataValues.useridTo },
                attributes: ['name', 'nation', 'profileImgPath'],
            });

            const myUserNameData = await User.findOne({
                where: { userid: userid },
                attributes: ['name', 'nation', 'profileImgPath'],
            });
            const myUserName = myUserNameData.dataValues.name;

            const existingArr = [
                existingUserid.dataValues,
                existingUseridTo.dataValues,
            ];

            const final = existingArr.filter((elem) => {
                return elem.name !== myUserName;
            });
            result.dataValues.realRoomName = final;
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
        return res.status(401).json({
            msg: 'Please Login First!',
            isError: true,
        });
    }

    let results;
    try {
        results = await Room.findAll({
            where: {
                useridTo: 'monoChat',
            },
            attributes: [
                'roomNum',
                'roomName',
                'userid',
                'restrictedLang',
                'createdAt',
            ],
            include: [
                {
                    model: Chat,
                    order: [['createdAt', 'DESC']],
                    limit: 1,
                },
            ],
        });
        for (const result of results) {
            console.log(result.dataValues.roomNum);
            let numberOfPeople = await Chat.count({
                distinct: true,
                col: 'userid',
                where: { roomNum: result.dataValues.roomNum },
            });
            if (numberOfPeople === 0) {
                numberOfPeople = 1;
            }
            result.dataValues.numberOfPeople = numberOfPeople;

            let userInfo = await User.findOne({
                where: { userid: result.dataValues.userid },
                attributes: ['name', 'nation', 'profileImgPath'],
            });
            result.dataValues.userInfo = userInfo;
        }
    } catch (err) {
        return next(err);
    }
    res.json({
        monoRooms: results,
        isError: false,
    });
};

export const getChatLog = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const roomNum = req.params.id;
    const userid = req.session.userid;

    if (!userid || userid.length < 4) {
        return res.status(401).json({
            msg: 'Please Login First!',
            isError: true,
        });
    }

    try {
        const validCheck = await Room.findOne({
            where: { roomNum: roomNum },
        });

        if (!validCheck) {
            return res
                .status(404)
                .json({ msg: `There's no Chat Room`, isError: true });
        }
        ChatCount.destroy({
            where: { roomNum: roomNum, useridTo: userid },
        });

        const results = await Chat.findAll({
            where: { roomNum: roomNum },
            include: [
                {
                    model: User,
                    attributes: ['profileImgPath', 'name'],
                },
            ],
        });
        for (const result of results) {
            // let numberOfPeople = await Chat.count({
            //     distinct: true,
            //     col: 'userid',
            //     where: { roomNum: result.dataValues.roomNum },
            // });
            const chatCounting = await ChatCount.count({
                attributes: [
                    [
                        sequelize.fn(
                            'COUNT',
                            sequelize.literal('DISTINCT useridTo')
                        ),
                        'userCount',
                    ],
                ],
                where: {
                    roomNum: roomNum,
                    chatIndex: result.dataValues.chatIndex,
                },
            });
            result.dataValues.chatCounting = chatCounting;
        }

        res.json({ chatLog: results });
    } catch (err) {
        return next(err);
    }
};
