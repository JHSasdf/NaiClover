import express from 'express';
import * as controller from '../controllers/post.cotroller';
export const postsRouter = express();

postsRouter.get('/posts', controller.getPosts);

postsRouter.post('/posts/createpost', controller.createPost);

postsRouter.get('/posts/:id', controller.getSinglePost);

postsRouter.patch('/posts/:id', controller.updatePost);

postsRouter.delete('/posts/:id', controller.deletePost);

postsRouter.post('/posts/:id', controller.togglePostLike);

postsRouter.post('/comments/createcomment/:id', controller.createComment);

postsRouter.get('/comments/:id', controller.getComments);

postsRouter.patch('/comments/:commentindex', controller.updateComment);

postsRouter.delete('/comments/:commentindex', controller.deleteComment);
