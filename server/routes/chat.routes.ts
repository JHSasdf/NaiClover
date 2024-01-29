import express from 'express';
import * as controller from '../controllers/chat.controller';
export const chatRouter = express();

chatRouter.get('/fetch/personalrooms', controller.getPersonalRooms);
chatRouter.get('/fetch/monorooms', controller.getMonoRooms);
