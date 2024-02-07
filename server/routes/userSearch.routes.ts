const express = require('express');
import * as controller from '../controllers/searchUser.controller';
export const userSearchRouter = express();

userSearchRouter.get('/userinfo/:id', controller.getUserInfo);
