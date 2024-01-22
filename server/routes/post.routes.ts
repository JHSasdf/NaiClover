import express from 'express';
import * as controller from '../controllers/post.cotroller';
export const postsRouter = express();

postsRouter.get('/posts', controller.getPosts);

postsRouter.post('/posts/createpost', controller.createPost);

postsRouter.get('/posts/:id', controller.getSinglePost);

postsRouter.patch('/posts/:id', controller.updatePost);

postsRouter.delete('/posts/:id', controller.deletePost);

postsRouter.post('/posts/:id', controller.togglePostLike);
