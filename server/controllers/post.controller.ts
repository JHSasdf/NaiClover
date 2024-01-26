import { Request, Response, NextFunction } from 'express';
import { db } from '../model';
const User = db.User;
const Post = db.Post;
const PostLikes = db.PostLike;
const Comment = db.Comment;
const postImages = db.PostImages;

import { postsInterface } from '../types/types';

// 전체 포스트 get요청
export const getPosts = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    let allPosts: Array<postsInterface> = [];

    let { userid: myUserid } = req.query;
    if (!myUserid) {
        myUserid = '';
    }
    try {
        allPosts = await Post.findAll({
            attributes: ['postId', 'userid', 'content', 'createdAt'],
            include: [
                {
                    model: User,
                    attributes: ['name', 'nation'],
                },
            ],
        });
    } catch (err) {
        return next(err);
    }
    if (!allPosts || allPosts.length < 1) {
        return res.json({ msg: `Maybe there's no post here!`, isError: true });
    }
    let PostsDatas = [];
    for (let i = 0; i < allPosts.length; i++) {
        try {
            const likeCount = await PostLikes.count({
                where: {
                    PostId: allPosts[i].postId,
                },
            });

            const commentCount = await Comment.count({
                where: {
                    PostId: allPosts[i].postId,
                },
            });

            const myLikeData = await PostLikes.findOne({
                where: {
                    PostId: allPosts[i].postId,
                    userid: myUserid,
                },
            });

            if (myLikeData) {
                PostsDatas.push([allPosts[i], likeCount, true, commentCount]);
            } else {
                PostsDatas.push([allPosts[i], likeCount, false, commentCount]);
            }
        } catch (err) {
            return next(err);
        }
    }
    // map으로 render 가능하게 PostDatas[0][0] = allPosts, PostDatas[0][1] = likeCount, PostDatas[0][2] = myLikeData(boolean)
    res.json({
        PostsDatas: PostsDatas,
        isError: false,
    });
};

// 포스트 만들기 post 요청
export const createPost = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { content } = req.body;
    const userid = req.session.userid;
    if (!userid || userid.length < 4) {
        return res.json({
            msg: `Something Went Wrong! Please try it later!`,
            isError: true,
        });
    }
    try {
        const result = await Post.create({
            userid: userid,
            content: content,
        });
        const postId = result.postId;
        const files = req.files as Express.Multer.File[];
        if (files && files.length > 0) {
            for (let i = 0; i < files.length; i++) {
                const path = files[i].path;
                await postImages.create({
                    postId: postId,
                    userid: req.session.userid,
                    path: `/${path}`,
                });
            }
        }
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
    let likeCount;
    let didLike = false;

    let { userid: myUserid } = req.query;

    if (!myUserid) {
        myUserid = '';
    }

    try {
        singlePost = await Post.findOne({
            where: { postId: postId },
            include: [
                {
                    model: User,
                    attributes: ['name', 'nation'],
                },
            ],
        });

        likeCount = await PostLikes.count({
            where: {
                PostId: postId,
            },
        });

        const myLikeData = await PostLikes.findOne({
            where: {
                PostId: postId,
                userid: myUserid,
            },
        });
        if (myLikeData) {
            didLike = true;
        }
    } catch (err) {
        return next(err);
    }

    if (!singlePost) {
        return res.json({
            msg: `Something Went Wrong! Please try it later!`,
            isError: true,
        });
    }
    return res.json({
        posts: singlePost,
        likeCount: likeCount,
        didLike: didLike,
        isError: false,
    });
};

// 게시글 좋아요 기능 post
export const togglePostLike = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
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

// 댓글 작성 기능
export const createComment = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { userid, content, isrevised } = req.body;
    const postId = parseInt(req.params.id);

    try {
        await Comment.create({
            userid: userid,
            content: content,
            postId: postId,
            isrevised: isrevised,
        });
    } catch (err) {
        return next(err);
    }
    res.json({
        msg: 'Comment created!',
        isError: false,
    });
};

// 게시글의 댓글 불러오기 기능
export const getComments = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const postId = parseInt(req.params.id);
    let result;
    try {
        result = await Comment.findAll({
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
    if (!result || result.length < 1) {
        return res.json({
            msg: `There's no Comment here! Why don't you try some?`,
            isError: true,
        });
    }
    res.json({
        msg: 'fetching data completed',
        Comments: result,
        isError: false,
    });
};

// 댓글 업데이트 기능 commentIndex는 Comment 테이블의 index
export const updateComment = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const commentIndex = parseInt(req.params.commentindex);
    const { userid, content } = req.body;

    if (!userid || userid.length < 4) {
        return res.json({
            msg: `Something Went Wrong! Please try it later!`,
            isError: true,
        });
    }

    let existingUserid;
    try {
        existingUserid = await Comment.findOne({
            where: { index: commentIndex },
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
        await Comment.update(
            {
                content: content,
            },
            {
                where: { index: commentIndex },
            }
        );
    } catch (err) {
        return next(err);
    }
    return res.json({
        msg: 'Comment update succeed',
        isError: false,
    });
};

// 댓글 삭제 기능. commentIndex는 댓글의 index
export const deleteComment = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { userid } = req.body;
    const commentIndex = parseInt(req.params.commentindex);
    if (!userid || userid.length < 4) {
        return res.json({
            msg: `Something Went Wrong! Please try it later!`,
            isError: true,
        });
    }
    let existingUserid;
    try {
        existingUserid = await Comment.findOne({
            where: { index: commentIndex },
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
        await Comment.destroy({
            where: { index: commentIndex },
        });
    } catch (err) {
        return next(err);
    }
    return res.json({
        msg: 'comment deletion succeed',
        isError: false,
    });
};

export const multerTest = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    console.log('req.body:', req.body);
    console.log('req.files: ', req.files, typeof req.files);

    if (req.files) {
        const files: any = req.files;
        for (let i = 0; i < files.length; i++) {
            console.log(files[i]);
        }
    }
};
