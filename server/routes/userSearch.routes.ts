import express from 'express';
import * as controller from '../controllers/searchUser.controller';
export const userSearchRouter = express();

userSearchRouter.get('/userinfo/:id', controller.getUserInfo);

userSearchRouter.get('/getuserroomid/:id', controller.getRoomId);
