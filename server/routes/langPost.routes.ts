import express from 'express';
import * as controller from '../controllers/langPost.controller';
export const langPostsRouter = express();

langPostsRouter.get('/posts', controller.getPosts);

langPostsRouter.post('/posts/createpost', controller.createPost);

langPostsRouter.get('/posts/:id', controller.getSinglePost);

langPostsRouter.patch('/posts/:id', controller.updatePost);

langPostsRouter.delete('/posts/:id', controller.deletePost);

langPostsRouter.post('/posts/:id', controller.togglePostLike);

langPostsRouter.post('/comments/createcomment/:id', controller.createComment);

langPostsRouter.get('/comments/:id', controller.getComments);

langPostsRouter.patch('/comments/:commentindex', controller.updateComment);

langPostsRouter.delete('/comments/:commentindex', controller.deleteComment);
