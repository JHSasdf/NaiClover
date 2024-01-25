import express from 'express';
import * as controller from '../controllers/mypage.controller';
export const myPageRouter = express();

myPageRouter.get('/getMyPage', controller.getmyPage);

myPageRouter.patch('/mypage/changeuserpassword', controller.changeUserPassword);

myPageRouter.patch('/mypage/changeusername', controller.changeUserName);

myPageRouter.patch('/mypage/changeuserlang', controller.changeUserLang);

myPageRouter.patch('/mypage/editIntroduction', controller.editIntroduction);

myPageRouter.delete('/mypage/deleteuser', controller.deleteUser);

myPageRouter.post('/mypage/logout', controller.logout);
