const express = require('express');
import * as controller from '../controllers/langPost.controller';
export const langPostsRouter = express();

langPostsRouter.get('/lang/posts', controller.getPosts);

langPostsRouter.post('/lang/posts/createpost', controller.createPost);

langPostsRouter.get('/lang/posts/:id', controller.getSinglePost);

langPostsRouter.patch('/lang/posts/:id', controller.updatePost);

langPostsRouter.delete('/lang/posts/:id', controller.deletePost);

langPostsRouter.post('/lang/posts/:id', controller.togglePostLike);

langPostsRouter.post(
    '/lang/comments/createcomment/:id',
    controller.createComment
);

langPostsRouter.get('/lang/comments/:id', controller.getComments);

langPostsRouter.patch('/lang/comments/:commentindex', controller.updateComment);

langPostsRouter.delete(
    '/lang/comments/:commentindex',
    controller.deleteComment
);
