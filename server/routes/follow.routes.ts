import express from 'express';
import * as controller from '../controllers/follow.controller';
export const followRouter = express();

followRouter.post('/followexec', controller.follow);
followRouter.post('/unfollowexec', controller.unfollow);
