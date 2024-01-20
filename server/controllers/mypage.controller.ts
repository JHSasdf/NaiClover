import { Request, Response, NextFunction } from 'express';
import * as bcrypt from 'bcrypt';
import { db } from '../model';
import { existingLangInterface } from '../types/types';
import { userDataInterface } from '../types/types';
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
    let userDataObj: userDataInterface;
    let learningLangObjArr: Array<existingLangInterface> = [];
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
        return res.json({ msg: '에러가 발생했습니다1', isError: true });
    }
    try {
        learningLangObjArr = await Lang.findAll({
            where: { userid: userid },
            attributes: ['index', 'learningLang'],
        });
    } catch (err) {
        next(err);
    }

    if (!learningLangObjArr) {
        return res.json({ msg: '에러가 발생했습니다2', isError: true });
    }

    let learningLang: Array<string> = [];

    for (const existingLangsObj of learningLangObjArr) {
        learningLang.push(existingLangsObj.learningLang);
    }

    // try {
    //     followDatas = await Follow.findAll({
    //         where: { userid: userid },
    //     });
    // } catch (err) {
    //     return next(err);
    // }

    // if (!followDatas) {
    //     return res.json({
    //         msg: '에러가 발생했습니다3',
    //         isError: true,
    //     });
    // }

    // try {
    //     postDatas = await Post.findAll({
    //         where: { userid: userid },
    //     });
    // } catch (err) {
    //     return next(err);
    // }

    // if (!postDatas) {
    //     return res.json({
    //         msg: '에러가 발생했습니다4',
    //         isError: true,
    //     });
    // }
    // json으로 post, follow datas 보내주기. 다만 userData는 객체 하나지만 나머지는 객체의 배열임에 주의
    // console.log(postDatas, followDatas);

    res.json({ userDataObj: userDataObj, learningLang: learningLang });
};

export const changeUserPassword = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { userid, currentPassword, newPassword, confirmPassword } = req.body;
    let userPassword;
    try {
        userPassword = await User.findOne({
            where: { userid: userid },
            attributes: ['password'],
        });
    } catch (err) {
        return next(err);
    }

    const result = bcrypt.compareSync(currentPassword, userPassword.password);
    if (!result) {
        return res.json({ msg: '현재 비밀번호가 다릅니다.', isError: true });
    }

    if (newPassword.trim().length < 6 || !newPassword) {
        return res.json({
            msg: '비밀번호를 6자 이상으로 입력해주세요.',
            isError: true,
        });
    }

    if (!(newPassword === confirmPassword)) {
        return res.json({
            msg: '새 비밀번호와 확인 비밀번호가 다릅니다.',
            isError: true,
        });
    }

    let isSame;
    try {
        isSame = bcrypt.compareSync(newPassword, userPassword.password);
    } catch (err) {
        return next(err);
    }

    if (isSame) {
        return res.json({
            msg: '이전 비밀번호와 동일한 비밀번호입니다.',
            isError: true,
        });
    }
    let hashedNewPassword;
    try {
        hashedNewPassword = bcrypt.hashSync(newPassword, 12);
    } catch (err) {
        return next(err);
    }

    try {
        await User.update(
            {
                password: hashedNewPassword,
            },
            {
                where: { userid: userid },
            }
        );
        return res.json({
            msg: '비밀번호 변경이 완료되었습니다.',
            isError: false,
        });
    } catch (err) {
        return res.json({
            msg: '오류가 발생하였습니다. 새로고침 후 다시 시도해주세요',
            isError: true,
        });
    }
};

export const changeUserLang = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { userid, learningLangs } = req.body;
    if (
        learningLangs &&
        learningLangs.length > 0 &&
        learningLangs[0].trim().length > 0
    ) {
        try {
            await Lang.destroy({
                where: { userid: userid },
            });
            for (const lang of learningLangs) {
                await Lang.create({
                    userid: userid,
                    learningLang: lang,
                });
            }
        } catch (err) {
            next(err);
        }
        res.json({ msg: '학습 언어 변경이 완료되었습니다.', isError: false });
    } else {
        res.json({
            msg: '오류가 발생하였습니다. 새로고침 후 다시 시도해주세요',
            isError: true,
        });
    }
};

export const changeUserName = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { userid, name } = req.body;
    try {
        await User.update({ name: name }, { where: { userid: userid } });
        res.json({ msg: '이름 변경이 완료되었습니다.', isError: false });
    } catch (err) {
        res.json({
            msg: '오류가 발생하여습니다. 새로고침 후 다시 시도해주세요',
            isError: true,
        });
    }
};

export const deleteUser = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { userid } = req.body;
    try {
        await User.destroy({
            where: { userid: userid },
        });
        res.json({
            msg: '삭제 완료',
            isError: false,
        });
    } catch (err) {
        res.json({
            msg: '오류가 발생하였습니다. 새로고침 후 다시 시도해주세요',
            isError: true,
        });
    }
};
