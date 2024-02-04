"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.chatRouter = void 0;
var express = require('express');
var controller = require("../controllers/chat.controller");
exports.chatRouter = express();
exports.chatRouter.get('/fetch/personalrooms', controller.getPersonalRooms);
exports.chatRouter.get('/fetch/monorooms', controller.getMonoRooms);
exports.chatRouter.get('/getchatlog/:id', controller.getChatLog);
