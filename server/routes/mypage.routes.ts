import express from 'express';
import * as controller from '../controllers/mypage.controller';
export const myPageRouter = express();

myPageRouter.get('/mypage', controller.getmyPage);
