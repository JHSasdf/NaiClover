"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postSearchRouter = void 0;
var express = require('express');
var controller = require("../controllers/searchPost.controller");
exports.postSearchRouter = express();
exports.postSearchRouter.get('/posts/results', controller.getSearchPosts);
