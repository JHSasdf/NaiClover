import { Request, Response, NextFunction } from 'express';
import * as bcrypt from 'bcrypt';
import { db } from '../model';
const User = db.User;
const Lang = db.Lang;
const Follow = db.Follow;
const Post = db.Post;

export const getmyPage = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { userid } = req.body;
    let userDataObj;
    let learningLang;
    let followDatas;
    let postDatas;

    if (!userid || userid == '' || userid === null) {
        return res.json({ msg: '에러가 발생했습니다', isError: true });
    }

    try {
        userDataObj = await User.findOne({
            where: { userid: userid },
            attributes: ['userid', 'name', 'gender', 'nation', 'firLang'],
        });
    } catch (err) {
        return next(err);
    }

    if (!userDataObj) {
        return res.json({ msg: '에러가 발생했습니다', isError: true });
    }
    try {
        learningLang = await Lang.findAll({
            where: { userid: userid },
            attributes: ['index', 'learningLang'],
        });
    } catch (err) {
        next(err);
    }

    if (!learningLang) {
        return res.json({ msg: '에러가 발생했습니다', isError: true });
    }

    try {
        followDatas = await Follow.findAll({
            where: { userid: userid },
        });
    } catch (err) {
        return next(err);
    }

    if (!followDatas) {
        return res.json({
            msg: '팔로우에서 에러가 발생했습니다',
            isError: true,
        });
    }

    try {
        postDatas = await Post.findAll({
            where: { userid: userid },
        });
    } catch (err) {
        return next(err);
    }

    if (!postDatas) {
        return res.json({
            msg: '포스트에서 에러가 발생했습니다',
            isError: true,
        });
    }
    // console.log(postDatas, followDatas);

    res.json({ userDataObj: userDataObj, learningLang: learningLang });
};
