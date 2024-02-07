"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMyPageMulterConfig = exports.getPostMulterConfig = void 0;
var multer = require('multer');
var path = require('path');
var getPostMulterConfig = function () {
    return {
        storage: multer.diskStorage({
            destination: function (req, file, done) {
                done(null, 'public/posts/');
            },
            filename: function (req, file, done) {
                var ext = path.extname(file.originalname);
                done(null, (req.session.userid || 'userid') + Date.now() + ext);
            },
        }),
        limits: {
            fileSize: 20 * 1024 * 1024,
        },
    };
};
exports.getPostMulterConfig = getPostMulterConfig;
var getMyPageMulterConfig = function () {
    return {
        storage: multer.diskStorage({
            destination: function (req, file, done) {
                done(null, 'public/mypage/');
            },
            filename: function (req, file, done) {
                var ext = path.extname(file.originalname);
                done(null, (req.session.userid || 'userid') + Date.now() + ext);
            },
        }),
        limits: {
            fileSize: 20 * 1024 * 1024,
        },
    };
};
exports.getMyPageMulterConfig = getMyPageMulterConfig;
