import { Request, Response, NextFunction } from 'express';
import { db } from '../model';
import { Op } from 'sequelize';

const Post = db.Post;
const User = db.User;
const postImages = db.PostImages;
const LangPost = db.LangPost;

import { postsInterface } from '../types/types';

export const getSearchPosts = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    let { searchQuery } = req.query;
    try {
        if (!searchQuery) {
            return res.json({
                msg: 'Please Provide a search query.',
                isError: true,
            });
        }

        // content에 검색어를 포함하고 postType이 'c'인 포스트들을 찾음
        const cResults = await Post.findAll({
            attributes: [
                'postId',
                'userid',
                'content',
                'createdAt',
                'postType',
            ],
            include: [
                {
                    model: User,
                    attributes: ['name', 'nation', 'firLang', 'profileImgPath'],
                },
                {
                    model: postImages,
                    attributes: ['path'],
                },
            ],
            where: {
                content: {
                    [Op.like]: `%${searchQuery}%`,
                },
                postType: 'c',
            },
        });

        // content에 검색어를 포함하고 postType이 'l'인 포스트들을 찾음
        const lResults = await LangPost.findAll({
            attributes: [
                'postId',
                'userid',
                'content',
                'createdAt',
                'postType',
            ],
            include: [
                {
                    model: User,
                    attributes: ['name', 'nation', 'firLang', 'profileImgPath'],
                },
            ],
            where: {
                content: {
                    [Op.like]: `%${searchQuery}%`,
                },
                postType: 'l',
            },
        });

        let SearchPosts = {
            c: <any>[],
            l: <any>[],
        };

        for (let i = 0; i < cResults.length; i++) {
            SearchPosts.c.push(cResults[i]);
        }

        // for(let i=0; i<lResults.length; i++){
        //     SearchPosts.l.push(lResults[i]);
        // }
        SearchPosts.c = cResults;
        SearchPosts.l = lResults;

        if (SearchPosts.c.length === 0 && SearchPosts.l.length === 0) {
            return res.json({ msg: 'No matching posts found', isError: false });
        }

        return res.json({
            SearchPosts: SearchPosts,
            isError: false,
        });
    } catch (error) {
        console.log(error);
    }
};
