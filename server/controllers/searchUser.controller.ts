import { Request, Response, NextFunction } from 'express';
import { db } from '../model';
import { existingLangInterface } from '../types/types';
import { userDataInterface } from '../types/types';
const User = db.User;
const Lang = db.Lang;
const Follow = db.Follow;
const Post = db.Post;
const Comment = db.Comment;
const PostLike = db.PostLike;
const PostImage = db.PostImages;
const LangPost = db.LangPost;
const LangComment = db.LangComment;
const LangPostLike = db.LangPostLike;

// mypage에 들어가서 page가 render되면 useEffect와 axios로 정보를 가져오는 함수
export const getUserInfo = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const userid = req.params.id;
    let userDataObj: userDataInterface;
    let learningLangObjArr: Array<existingLangInterface> = [];
    let isFollowing: boolean = false;
    let followerCount;
    let followingCount;
    let myUserid = req.session.userid;

    if (!myUserid || myUserid.length < 4) {
        req.session.userid = '';
    }

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
                'profileImgPath',
            ],
        });
    } catch (err) {
        return next(err);
    }

    if (!userDataObj) {
        return res.status(404).json({ msg: 'User not founded', isError: true });
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
        return res
            .status(500)
            .json({ msg: 'An Error occurred', isError: true });
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
            include: [
                {
                    model: User,
                    attributes: ['name', 'gender', 'nation', 'profileImgPath'],
                },
                {
                    model: Comment,
                },
                {
                    model: PostLike,
                },
                {
                    model: PostImage,
                },
            ],
        });
        postLangDatas = await LangPost.findAll({
            where: { userid: userid },
            include: [
                {
                    model: User,
                    attributes: [
                        'name',
                        'gender',
                        'nation',
                        'profileImgPath',
                        'firLang',
                    ],
                    include: [
                        {
                            model: Lang,
                        },
                    ],
                },
                {
                    model: LangComment,
                },
                {
                    model: LangPostLike,
                },
            ],
        });
        followerCount = await Follow.count({
            where: {
                userid: userid,
            },
        });
        followingCount = await Follow.count({
            where: {
                followerId: userid,
            },
        });
        const isFollowingData = await Follow.findOne({
            where: {
                followerId: myUserid,
                userid: userid,
            },
        });
        if (isFollowingData) {
            isFollowing = true;
        }
    } catch (err) {
        return next(err);
    }

    res.json({
        userDataObj: userDataObj,
        learningLang: learningLang,
        postCulDatas: postCulDatas,
        postLangDatas: postLangDatas,
        followerCount: followerCount,
        followingCount: followingCount,
        isFollowing: isFollowing,
    });
};
