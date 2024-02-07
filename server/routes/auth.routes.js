"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = void 0;
var express = require('express');
var controller = require("../controllers/auth.controller");
exports.authRouter = express();
exports.authRouter.post('/login', controller.login);
exports.authRouter.post('/signup', controller.signup);
exports.authRouter.post('/existAlready', controller.existAlready);
