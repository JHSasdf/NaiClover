const express = require('express');
import * as controller from '../controllers/chat.controller';
export const chatRouter = express();

chatRouter.get('/fetch/personalrooms', controller.getPersonalRooms);
chatRouter.get('/fetch/monorooms', controller.getMonoRooms);

chatRouter.get('/getchatlog/:id', controller.getChatLog);
