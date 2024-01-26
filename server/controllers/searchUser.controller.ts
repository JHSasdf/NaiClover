import { Request, Response, NextFunction } from 'express';
import { db } from '../model';
import { existingLangInterface } from '../types/types';
import { userDataInterface } from '../types/types';
const User = db.User;
const Lang = db.Lang;
const Follow = db.Follow;
const Post = db.Post;
const LangPost = db.LangPost;
const MypageImage = db.MypageImages;

// mypage에 들어가서 page가 render되면 useEffect와 axios로 정보를 가져오는 함수
export const getUserInfo = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const userid = req.params.id;
    let userDataObj: userDataInterface;
    let learningLangObjArr: Array<existingLangInterface> = [];
    let followDatas;

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
            include: [
                {
                    model: MypageImage,
                    attributes: ['path'],
                },
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

    let postCulDatas;
    let postLangDatas;

    try {
        postCulDatas = await Post.findAll({
            where: { userid: userid },
        });
        postLangDatas = await LangPost.findAll({
            where: { userid: userid },
        });
    } catch (err) {
        return next(err);
    }

    const followerCount = await Follow.count({
        where: {
            userid: userid,
        },
    });
    const followingCount = await Follow.count({
        where: {
            followerId: userid,
        },
    });

    res.json({
        userDataObj: userDataObj,
        learningLang: learningLang,
        postCulDatas: postCulDatas,
        postLangDatas: postLangDatas,
        followerCount: followerCount,
        followingCount: followingCount,
    });
};
