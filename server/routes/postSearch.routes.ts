import express from 'express';
import * as controller from '../controllers/searchPost.controller';
export const postSearchRouter = express();

postSearchRouter.get('/posts/results', controller.getSearchPosts);