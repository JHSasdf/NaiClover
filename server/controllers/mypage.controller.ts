import { Request, Response, NextFunction } from 'express';
import * as bcrypt from 'bcrypt';
import { db } from '../model';
import { existingLangInterface } from '../types/types';
import { userDataInterface } from '../types/types';
const User = db.User;
const Lang = db.Lang;
const Follow = db.Follow;
const Post = db.Post;

// mypage에 들어가서 page가 render되면 useEffect와 axios로 정보를 가져오는 함수
export const getmyPage = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { userid } = req.query;
    let userDataObj: userDataInterface;
    let learningLangObjArr: Array<existingLangInterface> = [];
    let followDatas;
    let postDatas;

    if (!userid || userid == '' || userid === null) {
        return res.json({
            msg: 'Something went wrong! please try it later!',
            isError: true,
        });
    }

    try {
        userDataObj = await User.findOne({
            where: { userid: userid },
            attributes: [
                'userid',
                'name',
                'gender',
                'nation',
                'introduction',
                'firLang',
            ],
        });
    } catch (err) {
        return next(err);
    }

    if (!userDataObj) {
        return res.json({ msg: 'An Error occurred', isError: true });
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
        return res.json({ msg: 'An Error occurred', isError: true });
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
    //         msg: 'An Error occurred',
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
    //         msg: 'An Error occurred',
    //         isError: true,
    //     });
    // }
    // json으로 post, follow datas 보내주기. 다만 userData는 객체 하나지만 나머지는 객체의 배열임에 주의
    // console.log(postDatas, followDatas);

    res.json({ userDataObj: userDataObj, learningLang: learningLang });
};

// userPassword를 변경하는 버튼을 눌렀을 때 실행되는 함수
export const changeUserPassword = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { userid, currentPassword, newPassword, confirmPassword } = req.body;

    if (!userid || userid == '' || userid === null) {
        return res.json({
            msg: 'Something went wrong! please try it later!',
            isError: true,
        });
    }

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
        return res.json({
            msg: 'Existing password is incorrect.',
            isError: true,
        });
    }

    if (newPassword.trim().length < 6 || !newPassword) {
        return res.json({
            msg: 'Password should be at least 6 characters long.',
            isError: true,
        });
    }

    if (!(newPassword === confirmPassword)) {
        return res.json({
            msg: `There's a differenct between new Password and confirm Password`,
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
            msg: 'Existing password and New password are same.',
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
            msg: 'Password change completed.',
            isError: false,
        });
    } catch (err) {
        return res.json({
            msg: 'An Erorr Occurred. Please try Later.',
            isError: true,
        });
    }
};

// user learning Language를 수정했을 때 실행되는 함수
export const changeUserLang = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { userid, learningLangs } = req.body;

    if (!userid || userid == '' || userid === null) {
        return res.json({
            msg: 'Something went wrong! please try it later!',
            isError: true,
        });
    }

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
        res.json({
            msg: 'Learning Languages change completed.',
            isError: false,
        });
    } else {
        res.json({
            msg: 'An Erorr Occurred. Please try Later.',
            isError: true,
        });
    }
};

// user name을 수정했을 때 실행되는 함수
export const changeUserName = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { userid, name } = req.body;

    if (!userid || userid == '' || userid === null) {
        return res.json({
            msg: 'Something went wrong! please try it later!',
            isError: true,
        });
    }

    try {
        await User.update({ name: name }, { where: { userid: userid } });
        res.json({ msg: 'name change completed.', isError: false });
    } catch (err) {
        res.json({
            msg: 'An Erorr Occurred. Please try Later.',
            isError: true,
        });
    }
};

// 회원 탈퇴 시 실행되는 함수
export const deleteUser = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { userid } = req.body;

    if (!userid || userid == '' || userid === null) {
        return res.json({
            msg: 'Something went wrong! please try it later!',
            isError: true,
        });
    }

    try {
        await User.destroy({
            where: { userid: userid },
        });
        res.json({
            msg: 'Deletion completed',
            isError: false,
        });
    } catch (err) {
        res.json({
            msg: 'An Erorr Occurred. Please try Later.',
            isError: true,
        });
    }
};

export const editIntroduction = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { userid, content } = req.body;

    if (!userid || userid == '' || userid === null) {
        return res.json({
            msg: 'Something went wrong! please try it later!',
            isError: true,
        });
    }
    try {
        await User.update(
            { introduction: content },
            { where: { userid: userid }, returning: true, plain: true }
        );

        console.log(content);
        console.log(userid);
        res.json({ msg: 'introduction change completed.', isError: false });
    } catch (err) {
        res.json({
            msg: 'An Erorr Occurred. Please try Later.',
            isError: true,
        });
    }
};
