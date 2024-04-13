"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteComment = exports.updateComment = exports.getComments = exports.createComment = exports.togglePostLike = exports.getSinglePost = exports.deletePost = exports.updatePost = exports.createPost = exports.getPosts = void 0;
var model_1 = require("../model");
var User = model_1.db.User;
var Post = model_1.db.Post;
var PostLikes = model_1.db.PostLike;
var Comment = model_1.db.Comment;
var postImages = model_1.db.PostImages;
var Alarm = model_1.db.Alarm;
var Follow = model_1.db.Follow;
// 전체 포스트 get요청
var getPosts = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var allPosts, myUserid, err_1, PostsDatas, i, likeCount, commentCount, myLikeData, followResult, isFollowing, err_2, sortedPostDatas;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                allPosts = [];
                myUserid = req.session.userid;
                if (!myUserid) {
                    myUserid = '';
                }
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, Post.findAll({
                        attributes: ['postId', 'userid', 'content', 'createdAt'],
                        include: [
                            {
                                model: User,
                                attributes: [
                                    'name',
                                    'nation',
                                    'gender',
                                    'firLang',
                                    'profileImgPath',
                                ],
                            },
                            {
                                model: postImages,
                                attributes: ['path'],
                            },
                        ],
                    })];
            case 2:
                allPosts = _a.sent();
                return [3 /*break*/, 4];
            case 3:
                err_1 = _a.sent();
                return [2 /*return*/, next(err_1)];
            case 4:
                if (!allPosts || allPosts.length < 1) {
                    return [2 /*return*/, res.json({ msg: "Maybe there's no post here!", isError: true })];
                }
                PostsDatas = [];
                i = 0;
                _a.label = 5;
            case 5:
                if (!(i < allPosts.length)) return [3 /*break*/, 13];
                _a.label = 6;
            case 6:
                _a.trys.push([6, 11, , 12]);
                return [4 /*yield*/, PostLikes.count({
                        where: {
                            PostId: allPosts[i].postId,
                        },
                    })];
            case 7:
                likeCount = _a.sent();
                return [4 /*yield*/, Comment.count({
                        where: {
                            PostId: allPosts[i].postId,
                        },
                    })];
            case 8:
                commentCount = _a.sent();
                return [4 /*yield*/, PostLikes.findOne({
                        where: {
                            PostId: allPosts[i].postId,
                            userid: myUserid,
                        },
                    })];
            case 9:
                myLikeData = _a.sent();
                return [4 /*yield*/, Follow.findOne({
                        where: { userid: allPosts[i].userid, followerId: myUserid },
                    })];
            case 10:
                followResult = _a.sent();
                isFollowing = void 0;
                if (followResult) {
                    isFollowing = true;
                }
                else {
                    isFollowing = false;
                }
                if (myLikeData) {
                    PostsDatas.push([
                        allPosts[i],
                        likeCount,
                        true,
                        commentCount,
                        isFollowing,
                    ]);
                }
                else {
                    PostsDatas.push([
                        allPosts[i],
                        likeCount,
                        false,
                        commentCount,
                        isFollowing,
                    ]);
                }
                return [3 /*break*/, 12];
            case 11:
                err_2 = _a.sent();
                return [2 /*return*/, next(err_2)];
            case 12:
                i++;
                return [3 /*break*/, 5];
            case 13:
                sortedPostDatas = PostsDatas.sort(function (a, b) {
                    var aDate = a[0].dataValues.createdAt;
                    var bDate = b[0].dataValues.createdAt;
                    return bDate - aDate;
                });
                sortedPostDatas = PostsDatas.sort(function (a, b) {
                    var aIsFollowing = a[4];
                    var bIsFollowing = b[4];
                    return bIsFollowing - aIsFollowing;
                });
                // map으로 render 가능하게 PostDatas[0][0] = allPosts, PostDatas[0][1] = likeCount, PostDatas[0][2] = myLikeData(boolean)
                res.json({
                    PostsDatas: sortedPostDatas,
                    isError: false,
                });
                return [2 /*return*/];
        }
    });
}); };
exports.getPosts = getPosts;
// 포스트 만들기 post 요청
var createPost = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var content, userid, newPost, files, i, path, followers, _i, followers_1, element, err_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                content = req.body.content;
                userid = req.session.userid;
                if (!userid || userid.length < 4) {
                    return [2 /*return*/, res.json({
                            msg: 'Please Login First!',
                            isError: true,
                        })];
                }
                _a.label = 1;
            case 1:
                _a.trys.push([1, 12, , 13]);
                return [4 /*yield*/, Post.create({
                        userid: userid,
                        content: content,
                    })];
            case 2:
                newPost = _a.sent();
                files = req.files;
                if (!(files && files.length > 0)) return [3 /*break*/, 6];
                i = 0;
                _a.label = 3;
            case 3:
                if (!(i < files.length)) return [3 /*break*/, 6];
                path = files[i].path;
                return [4 /*yield*/, postImages.create({
                        postId: newPost.postId,
                        userid: req.session.userid,
                        path: "/".concat(path),
                    })];
            case 4:
                _a.sent();
                _a.label = 5;
            case 5:
                i++;
                return [3 /*break*/, 3];
            case 6: return [4 /*yield*/, Follow.findAll({
                    where: {
                        userid: userid,
                    },
                })];
            case 7:
                followers = _a.sent();
                _i = 0, followers_1 = followers;
                _a.label = 8;
            case 8:
                if (!(_i < followers_1.length)) return [3 /*break*/, 11];
                element = followers_1[_i];
                return [4 /*yield*/, setAlarm(element.followerId, userid, 2, newPost.getDataValue('postId'), newPost.getDataValue('postType'))];
            case 9:
                _a.sent();
                _a.label = 10;
            case 10:
                _i++;
                return [3 /*break*/, 8];
            case 11: return [3 /*break*/, 13];
            case 12:
                err_3 = _a.sent();
                return [2 /*return*/, next(err_3)];
            case 13: return [2 /*return*/, res.json({
                    msg: 'Post succeed',
                    isError: false,
                })];
        }
    });
}); };
exports.createPost = createPost;
// 포스트 수정 patch 요청
var updatePost = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var content, userid, postId, existingUserid, err_4, err_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                content = req.body.content;
                userid = req.session.userid;
                postId = parseInt(req.params.id);
                if (!userid || userid.length < 4) {
                    return [2 /*return*/, res.status(401).json({
                            msg: 'Please Login First!',
                            isError: true,
                        })];
                }
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, Post.findOne({
                        where: { postId: postId },
                        attributes: ['userid'],
                    })];
            case 2:
                existingUserid = _a.sent();
                return [3 /*break*/, 4];
            case 3:
                err_4 = _a.sent();
                return [2 /*return*/, next(err_4)];
            case 4:
                if (!existingUserid || userid !== existingUserid.userid) {
                    return [2 /*return*/, res.status(500).json({
                            msg: "Something Went Wrong! Please try it later!",
                            isError: true,
                        })];
                }
                _a.label = 5;
            case 5:
                _a.trys.push([5, 7, , 8]);
                return [4 /*yield*/, Post.update({
                        content: content,
                    }, {
                        where: { postId: postId },
                    })];
            case 6:
                _a.sent();
                return [3 /*break*/, 8];
            case 7:
                err_5 = _a.sent();
                return [2 /*return*/, next(err_5)];
            case 8: return [2 /*return*/, res.json({
                    msg: 'Post update succeed',
                    isError: false,
                })];
        }
    });
}); };
exports.updatePost = updatePost;
// 포스트 삭제 delete 요청
var deletePost = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var userid, postId, existingUserid, err_6, err_7;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                userid = req.body.userid;
                postId = parseInt(req.params.id);
                if (!userid || userid.length < 4) {
                    return [2 /*return*/, res.status(401).json({
                            msg: 'Please Login First!',
                            isError: true,
                        })];
                }
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, Post.findOne({
                        where: { postId: postId },
                        attributes: ['userid'],
                    })];
            case 2:
                existingUserid = _a.sent();
                return [3 /*break*/, 4];
            case 3:
                err_6 = _a.sent();
                return [2 /*return*/, next(err_6)];
            case 4:
                if (!existingUserid || userid !== existingUserid.userid) {
                    return [2 /*return*/, res.status(500).json({
                            msg: "Something Went Wrong! Please try it later!",
                            isError: true,
                        })];
                }
                _a.label = 5;
            case 5:
                _a.trys.push([5, 7, , 8]);
                return [4 /*yield*/, Post.destroy({
                        where: { postId: postId },
                    })];
            case 6:
                _a.sent();
                return [3 /*break*/, 8];
            case 7:
                err_7 = _a.sent();
                return [2 /*return*/, next(err_7)];
            case 8: return [2 /*return*/, res.json({
                    msg: 'Post deletion succeed',
                    isError: false,
                })];
        }
    });
}); };
exports.deletePost = deletePost;
// 포스트 자세히보기 get 요청
var getSinglePost = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var postId, singlePost, likeCount, didLike, myUserid, myLikeData, err_8;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                postId = parseInt(req.params.id);
                didLike = false;
                myUserid = req.session.userid;
                if (!myUserid) {
                    myUserid = '';
                }
                _a.label = 1;
            case 1:
                _a.trys.push([1, 5, , 6]);
                return [4 /*yield*/, Post.findOne({
                        where: { postId: postId },
                        include: [
                            {
                                model: User,
                                attributes: ['name', 'gender', 'nation', 'profileImgPath'],
                            },
                            {
                                model: postImages,
                                attributes: ['path'],
                            },
                        ],
                    })];
            case 2:
                singlePost = _a.sent();
                return [4 /*yield*/, PostLikes.count({
                        where: {
                            PostId: postId,
                        },
                    })];
            case 3:
                likeCount = _a.sent();
                return [4 /*yield*/, PostLikes.findOne({
                        where: {
                            PostId: postId,
                            userid: myUserid,
                        },
                    })];
            case 4:
                myLikeData = _a.sent();
                if (myLikeData) {
                    didLike = true;
                }
                return [3 /*break*/, 6];
            case 5:
                err_8 = _a.sent();
                return [2 /*return*/, next(err_8)];
            case 6:
                if (!singlePost) {
                    return [2 /*return*/, res.status(404).json({
                            msg: "Something Went Wrong! Please try it later!",
                            isError: true,
                        })];
                }
                return [2 /*return*/, res.json({
                        posts: singlePost,
                        likeCount: likeCount,
                        didLike: didLike,
                        isError: false,
                    })];
        }
    });
}); };
exports.getSinglePost = getSinglePost;
// 게시글 좋아요 기능 post
var togglePostLike = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var userid, postId, pushLike, err_9, err_10, err_11;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                userid = req.session.userid;
                if (!userid || userid.length < 4) {
                    return [2 /*return*/, res.json({ msg: 'please login first', isError: true })];
                }
                postId = parseInt(req.params.id);
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, PostLikes.findOne({
                        where: { postId: postId, userid: userid },
                    })];
            case 2:
                pushLike = _a.sent();
                return [3 /*break*/, 4];
            case 3:
                err_9 = _a.sent();
                return [2 /*return*/, next(err_9)];
            case 4:
                if (!!pushLike) return [3 /*break*/, 9];
                _a.label = 5;
            case 5:
                _a.trys.push([5, 7, , 8]);
                return [4 /*yield*/, PostLikes.create({
                        postId: postId,
                        userid: userid,
                    })];
            case 6:
                _a.sent();
                return [3 /*break*/, 8];
            case 7:
                err_10 = _a.sent();
                return [2 /*return*/, next(err_10)];
            case 8: return [2 /*return*/, res.json({ msg: 'Like pushed', isError: false })];
            case 9:
                _a.trys.push([9, 11, , 12]);
                return [4 /*yield*/, PostLikes.destroy({
                        where: { postId: postId, userid: userid },
                    })];
            case 10:
                _a.sent();
                return [3 /*break*/, 12];
            case 11:
                err_11 = _a.sent();
                return [2 /*return*/, next(err_11)];
            case 12: return [2 /*return*/, res.json({ msg: 'Like deleted', isError: false })];
        }
    });
}); };
exports.togglePostLike = togglePostLike;
var setAlarm = function (userid, otherUserId, alarmType, option1, option2) { return __awaiter(void 0, void 0, void 0, function () {
    var error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, Alarm.create({
                        userid: userid,
                        otherUserId: otherUserId,
                        alarmType: alarmType,
                        checked: false,
                        option1: option1,
                        option2: option2,
                    })];
            case 1:
                _a.sent();
                return [3 /*break*/, 3];
            case 2:
                error_1 = _a.sent();
                console.log(error_1);
                return [2 /*return*/, error_1];
            case 3: return [2 /*return*/];
        }
    });
}); };
// 댓글 작성 기능
var createComment = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, content, isrevised, postUserId, postType, userid, postId, createdComment, createdCommentIndex, err_12;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, content = _a.content, isrevised = _a.isrevised, postUserId = _a.postUserId, postType = _a.postType;
                userid = req.session.userid;
                postId = parseInt(req.params.id);
                if (!userid || userid.length < 4) {
                    return [2 /*return*/, res.json({
                            msg: "You're trying to comment without login",
                            isError: true,
                        })];
                }
                _b.label = 1;
            case 1:
                _b.trys.push([1, 5, , 6]);
                return [4 /*yield*/, Comment.create({
                        userid: userid,
                        content: content,
                        postId: postId,
                        isrevised: isrevised,
                    })];
            case 2:
                createdComment = _b.sent();
                if (!(postUserId != userid)) return [3 /*break*/, 4];
                return [4 /*yield*/, setAlarm(postUserId, userid, 0, postId, postType)];
            case 3:
                _b.sent();
                _b.label = 4;
            case 4:
                createdCommentIndex = createdComment.getDataValue('index');
                res.json({
                    msg: 'Comment created!',
                    comment: {
                        index: createdCommentIndex,
                        content: content,
                        userid: req.session.userid,
                    },
                    isError: false,
                });
                return [3 /*break*/, 6];
            case 5:
                err_12 = _b.sent();
                return [2 /*return*/, next(err_12)];
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.createComment = createComment;
// 게시글의 댓글 불러오기 기능
var getComments = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var postId, result, err_13;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                postId = parseInt(req.params.id);
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, Comment.findAll({
                        where: { postId: postId },
                        include: [
                            {
                                model: User,
                                attributes: ['name', 'nation', 'profileImgPath'],
                            },
                        ],
                    })];
            case 2:
                result = _a.sent();
                return [3 /*break*/, 4];
            case 3:
                err_13 = _a.sent();
                return [2 /*return*/, next(err_13)];
            case 4:
                if (!result || result.length < 1) {
                    return [2 /*return*/, res.json({
                            msg: "There's no Comment here! Why don't you try some?",
                            isError: true,
                        })];
                }
                res.json({
                    msg: 'fetching data completed',
                    Comments: result,
                    isError: false,
                });
                return [2 /*return*/];
        }
    });
}); };
exports.getComments = getComments;
// 댓글 업데이트 기능 commentIndex는 Comment 테이블의 index
var updateComment = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var commentIndex, content, userid, existingUserid, err_14, err_15;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                commentIndex = parseInt(req.params.commentindex);
                content = req.body.content;
                userid = req.session.userid;
                if (!userid || userid.length < 4) {
                    return [2 /*return*/, res.status(401).json({
                            msg: "Please login first!",
                            isError: true,
                        })];
                }
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, Comment.findOne({
                        where: { index: commentIndex },
                        attributes: ['userid'],
                    })];
            case 2:
                existingUserid = _a.sent();
                return [3 /*break*/, 4];
            case 3:
                err_14 = _a.sent();
                return [2 /*return*/, next(err_14)];
            case 4:
                if (!existingUserid || userid !== existingUserid.userid) {
                    return [2 /*return*/, res.status(500).json({
                            msg: "Something Went Wrong! Please try it later!",
                            isError: true,
                        })];
                }
                _a.label = 5;
            case 5:
                _a.trys.push([5, 7, , 8]);
                return [4 /*yield*/, Comment.update({
                        content: content,
                    }, {
                        where: { index: commentIndex },
                    })];
            case 6:
                _a.sent();
                return [3 /*break*/, 8];
            case 7:
                err_15 = _a.sent();
                return [2 /*return*/, next(err_15)];
            case 8: return [2 /*return*/, res.json({
                    msg: 'Comment update succeed',
                    isError: false,
                })];
        }
    });
}); };
exports.updateComment = updateComment;
// 댓글 삭제 기능. commentIndex는 댓글의 index
var deleteComment = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var userid, commentIndex, existingUserid, err_16, err_17;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                userid = req.session.userid;
                commentIndex = parseInt(req.params.commentindex);
                if (!userid || userid.length < 4) {
                    return [2 /*return*/, res.status(401).json({
                            msg: "Please login first!",
                            isError: true,
                        })];
                }
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, Comment.findOne({
                        where: { index: commentIndex },
                        attributes: ['userid'],
                    })];
            case 2:
                existingUserid = _a.sent();
                return [3 /*break*/, 4];
            case 3:
                err_16 = _a.sent();
                return [2 /*return*/, next(err_16)];
            case 4:
                if (!existingUserid) {
                    return [2 /*return*/, res.status(500).json({
                            msg: "Something Went Wrong! Please try it later!",
                            isError: true,
                        })];
                }
                if (userid !== existingUserid.dataValues.userid) {
                    return [2 /*return*/, res.status(500).json({
                            msg: "Something Went Wrong! Please try it later!",
                            isError: true,
                        })];
                }
                _a.label = 5;
            case 5:
                _a.trys.push([5, 7, , 8]);
                return [4 /*yield*/, Comment.destroy({
                        where: { index: commentIndex },
                    })];
            case 6:
                _a.sent();
                return [3 /*break*/, 8];
            case 7:
                err_17 = _a.sent();
                return [2 /*return*/, next(err_17)];
            case 8: return [2 /*return*/, res.json({
                    msg: 'comment deletion succeed',
                    isError: false,
                })];
        }
    });
}); };
exports.deleteComment = deleteComment;
