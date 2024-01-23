import { Request, Response, NextFunction } from 'express';
import { db } from '../model';
const User = db.User;
const Post = db.Post;
const PostLikes = db.PostLike;

import { postsInterface } from '../types/types';

// 전체 포스트 get요청
export const getPosts = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    let allPosts: Array<postsInterface> = [];

    const { userid: myUserid } = req.body;
    try {
        allPosts = await Post.findAll({
            attributes: ['postId', 'userid', 'content', 'createdAt'],
            include: [
                {
                    model: User,
                    attributes: ['name'],
                },
            ],
        });
    } catch (err) {
        return next(err);
    }
    if (!allPosts || allPosts.length < 1) {
        return res.json({ msg: `Maybe there's no post here!`, isError: true });
    }
    let likeCountArr = [];
    let myLikeDataArr = [];
    for (let i = 0; i < allPosts.length; i++) {
        try {
            const likeCount = await PostLikes.count({
                where: {
                    PostId: allPosts[i].postId,
                },
            });
            likeCountArr.push(likeCount);

            const myLikeData = await PostLikes.findOne({
                where: {
                    PostId: allPosts[i].postId,
                    userid: myUserid,
                },
            });

            if (myLikeData) {
                myLikeDataArr.push(true);
            } else {
                myLikeDataArr.push(false);
            }
        } catch (err) {
            return next(err);
        }
    }

    res.json({
        allPosts: allPosts,
        likeCountArr: likeCountArr,
        myLikeDataArr: myLikeDataArr,
        idError: false,
    });
};

// 포스트 만들기 post 요청
export const createPost = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { userid, content } = req.body;

    if (!userid || userid.length < 4) {
        return res.json({
            msg: `Something Went Wrong! Please try it later!`,
            isError: true,
        });
    }

    try {
        await Post.create({
            userid: userid,
            content: content,
        });
    } catch (err) {
        return next(err);
    }
    return res.json({
        msg: 'Post succeed',
        isError: false,
    });
};

// 포스트 수정 patch 요청
export const updatePost = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { userid, content } = req.body;

    const postId = parseInt(req.params.id);
    if (!userid || userid.length < 4) {
        return res.json({
            msg: `Something Went Wrong! Please try it later!`,
            isError: true,
        });
    }

    let existingUserid;
    try {
        existingUserid = await Post.findOne({
            where: { postId: postId },
            attributes: ['userid'],
        });
    } catch (err) {
        return next(err);
    }

    if (userid !== existingUserid.userid) {
        return res.json({
            msg: `Something Went Wrong! Please try it later!`,
            isError: true,
        });
    }

    try {
        await Post.update(
            {
                content: content,
            },
            {
                where: { postId: postId },
            }
        );
    } catch (err) {
        return next(err);
    }
    return res.json({
        msg: 'Post update succeed',
        isError: false,
    });
};

// 포스트 삭제 delete 요청
export const deletePost = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { userid } = req.body;
    const postId = parseInt(req.params.id);
    if (!userid || userid.length < 4) {
        return res.json({
            msg: `Something Went Wrong! Please try it later!`,
            isError: true,
        });
    }
    let existingUserid;
    try {
        existingUserid = await Post.findOne({
            where: { postId: postId },
            attributes: ['userid'],
        });
    } catch (err) {
        return next(err);
    }

    if (userid !== existingUserid.userid) {
        return res.json({
            msg: `Something Went Wrong! Please try it later!`,
            isError: true,
        });
    }
    try {
        await Post.destroy({
            where: { postId: postId },
        });
    } catch (err) {
        return next(err);
    }
    return res.json({
        msg: 'Post deletion succeed',
        isError: false,
    });
};

// 포스트 자세히보기 get 요청
export const getSinglePost = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const postId = parseInt(req.params.id);
    let singlePost;
    try {
        singlePost = await Post.findOne({
            where: { postId: postId },
            include: [
                {
                    model: User,
                    attributes: ['name'],
                },
            ],
        });
    } catch (err) {
        return next(err);
    }

    if (!singlePost) {
        return res.json({
            msg: `Something Went Wrong! Please try it later!`,
            isError: true,
        });
    }
    return res.json({ posts: singlePost, isError: false });
};

// 게시글 좋아요 기능 post
export const togglePostLike = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    // postId를 params에 넣을지 body에 넣을지.. 지금은 일단 params에 넣음
    const { userid } = req.body;
    const postId = parseInt(req.params.id);
    let pushLike;
    try {
        pushLike = await PostLikes.findOne({
            where: { postId: postId, userid: userid },
        });
    } catch (err) {
        return next(err);
    }

    if (!pushLike) {
        try {
            await PostLikes.create({
                postId: postId,
                userid: userid,
            });
        } catch (err) {
            return next(err);
        }
        return res.json({ msg: 'Like pushed', isError: false });
    }
    try {
        await PostLikes.destroy({
            where: { postId: postId, userid: userid },
        });
    } catch (err) {
        return next(err);
    }

    return res.json({ msg: 'Like deleted', isError: false });
};
