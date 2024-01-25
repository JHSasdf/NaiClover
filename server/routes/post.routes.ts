import express from 'express';
import * as controller from '../controllers/post.controller';
export const postsRouter = express();

postsRouter.get('/cul/posts', controller.getPosts);

postsRouter.post('/cul/posts/createpost', controller.createPost);

postsRouter.get('/cul/posts/:id', controller.getSinglePost);

postsRouter.patch('/cul/posts/:id', controller.updatePost);

postsRouter.delete('/cul/posts/:id', controller.deletePost);

postsRouter.post('/cul/posts/:id', controller.togglePostLike);

postsRouter.post('/cul/comments/createcomment/:id', controller.createComment);

postsRouter.get('/cul/comments/:id', controller.getComments);

postsRouter.patch('/cul/comments/:commentindex', controller.updateComment);

postsRouter.delete('/cul/comments/:commentindex', controller.deleteComment);
