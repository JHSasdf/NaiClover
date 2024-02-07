"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userSearchRouter = void 0;
var express = require('express');
var controller = require("../controllers/searchUser.controller");
exports.userSearchRouter = express();
exports.userSearchRouter.get('/userinfo/:id', controller.getUserInfo);
