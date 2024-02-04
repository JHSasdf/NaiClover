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
exports.getRevisedLists = exports.multerMypage = exports.logout = exports.editIntroduction = exports.deleteUser = exports.changeUserName = exports.changeUserLang = exports.changeUserPassword = exports.getmyPage = void 0;
var bcrypt = require("bcrypt");
var model_1 = require("../model");
var User = model_1.db.User;
var Lang = model_1.db.Lang;
var Post = model_1.db.Post;
var Comment = model_1.db.Comment;
var PostLike = model_1.db.PostLike;
var PostImage = model_1.db.PostImages;
var LangPost = model_1.db.LangPost;
var LangComment = model_1.db.LangComment;
var LangPostLike = model_1.db.LangPostLike;
var Chat = model_1.db.Chat;
// mypage에 들어가서 page가 render되면 useEffect와 axios로 정보를 가져오는 함수
var getmyPage = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var userid, userDataObj, learningLangObjArr, err_1, err_2, learningLang, _i, learningLangObjArr_1, existingLangsObj, postCulDatas, postLangDatas, err_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                userid = req.session.userid;
                learningLangObjArr = [];
                if (!userid || userid == '' || userid === null) {
                    return [2 /*return*/, res.status(401).json({
                            msg: 'Please Login First!',
                            isError: true,
                        })];
                }
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, User.findOne({
                        where: { userid: userid },
                        attributes: [
                            'userid',
                            'name',
                            'gender',
                            'nation',
                            'introduction',
                            'firLang',
                            'profileImgPath',
                        ],
                    })];
            case 2:
                userDataObj = _a.sent();
                return [3 /*break*/, 4];
            case 3:
                err_1 = _a.sent();
                return [2 /*return*/, next(err_1)];
            case 4:
                if (!userDataObj) {
                    return [2 /*return*/, res
                            .status(500)
                            .json({ msg: 'An Error occurred', isError: true })];
                }
                _a.label = 5;
            case 5:
                _a.trys.push([5, 7, , 8]);
                return [4 /*yield*/, Lang.findAll({
                        where: { userid: userid },
                        attributes: ['index', 'learningLang'],
                    })];
            case 6:
                learningLangObjArr = _a.sent();
                return [3 /*break*/, 8];
            case 7:
                err_2 = _a.sent();
                next(err_2);
                return [3 /*break*/, 8];
            case 8:
                if (!learningLangObjArr) {
                    return [2 /*return*/, res
                            .status(500)
                            .json({ msg: 'An Error occurred', isError: true })];
                }
                learningLang = [];
                for (_i = 0, learningLangObjArr_1 = learningLangObjArr; _i < learningLangObjArr_1.length; _i++) {
                    existingLangsObj = learningLangObjArr_1[_i];
                    learningLang.push(existingLangsObj.learningLang);
                }
                _a.label = 9;
            case 9:
                _a.trys.push([9, 12, , 13]);
                return [4 /*yield*/, Post.findAll({
                        where: { userid: userid },
                        include: [
                            {
                                model: User,
                                attributes: [
                                    'name',
                                    'gender',
                                    'nation',
                                    'profileImgPath',
                                    'firLang',
                                ],
                                include: [
                                    {
                                        model: Lang,
                                    },
                                ],
                            },
                            {
                                model: Comment,
                            },
                            {
                                model: PostLike,
                            },
                            {
                                model: PostImage,
                            },
                        ],
                    })];
            case 10:
                postCulDatas = _a.sent();
                return [4 /*yield*/, LangPost.findAll({
                        where: { userid: userid },
                        include: [
                            {
                                model: User,
                                attributes: ['name', 'gender', 'nation', 'profileImgPath'],
                            },
                            {
                                model: LangComment,
                            },
                            {
                                model: LangPostLike,
                            },
                        ],
                    })];
            case 11:
                postLangDatas = _a.sent();
                return [3 /*break*/, 13];
            case 12:
                err_3 = _a.sent();
                return [2 /*return*/, next(err_3)];
            case 13:
                res.json({
                    userDataObj: userDataObj,
                    learningLang: learningLang,
                    postCulDatas: postCulDatas,
                    postLangDatas: postLangDatas,
                });
                return [2 /*return*/];
        }
    });
}); };
exports.getmyPage = getmyPage;
// userPassword를 변경하는 버튼을 눌렀을 때 실행되는 함수
var changeUserPassword = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, currentPassword, newPassword, confirmPassword, userid, userPassword, err_4, result, isSame, hashedNewPassword, err_5;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, currentPassword = _a.currentPassword, newPassword = _a.newPassword, confirmPassword = _a.confirmPassword;
                userid = req.session.userid;
                if (!userid || userid.length < 4) {
                    return [2 /*return*/, res.status(401).json({
                            msg: 'Please Login First!',
                            isError: true,
                        })];
                }
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                return [4 /*yield*/, User.findOne({
                        where: { userid: userid },
                        attributes: ['password'],
                    })];
            case 2:
                userPassword = _b.sent();
                return [3 /*break*/, 4];
            case 3:
                err_4 = _b.sent();
                return [2 /*return*/, next(err_4)];
            case 4:
                result = bcrypt.compareSync(currentPassword, userPassword.password);
                if (!result) {
                    return [2 /*return*/, res.json({
                            msg: 'Existing password is incorrect.',
                            isError: true,
                        })];
                }
                if (newPassword.trim().length < 6 || !newPassword) {
                    return [2 /*return*/, res.json({
                            msg: 'Password should be at least 6 characters long.',
                            isError: true,
                        })];
                }
                if (!(newPassword === confirmPassword)) {
                    return [2 /*return*/, res.json({
                            msg: "There's a difference between new Password and confirm Password",
                            isError: true,
                        })];
                }
                try {
                    isSame = bcrypt.compareSync(newPassword, userPassword.password);
                }
                catch (err) {
                    return [2 /*return*/, next(err)];
                }
                if (isSame) {
                    return [2 /*return*/, res.json({
                            msg: 'Existing password and New password are same.',
                            isError: true,
                        })];
                }
                try {
                    hashedNewPassword = bcrypt.hashSync(newPassword, 12);
                }
                catch (err) {
                    return [2 /*return*/, next(err)];
                }
                _b.label = 5;
            case 5:
                _b.trys.push([5, 7, , 8]);
                return [4 /*yield*/, User.update({
                        password: hashedNewPassword,
                    }, {
                        where: { userid: userid },
                    })];
            case 6:
                _b.sent();
                return [2 /*return*/, res.json({
                        msg: 'Password change completed.',
                        isError: false,
                    })];
            case 7:
                err_5 = _b.sent();
                return [2 /*return*/, res.json({
                        msg: 'An Erorr Occurred. Please try Later.',
                        isError: true,
                    })];
            case 8: return [2 /*return*/];
        }
    });
}); };
exports.changeUserPassword = changeUserPassword;
// user learning Language를 수정했을 때 실행되는 함수
var changeUserLang = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var learningLangs, userid, _i, learningLangs_1, lang, err_6;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                learningLangs = req.body.learningLangs;
                userid = req.session.userid;
                if (!userid || userid.length < 4) {
                    return [2 /*return*/, res.status(401).json({
                            msg: 'Please Login First!',
                            isError: true,
                        })];
                }
                if (!(learningLangs &&
                    learningLangs.length > 0 &&
                    learningLangs[0].trim().length > 0)) return [3 /*break*/, 9];
                _a.label = 1;
            case 1:
                _a.trys.push([1, 7, , 8]);
                return [4 /*yield*/, Lang.destroy({
                        where: { userid: userid },
                    })];
            case 2:
                _a.sent();
                _i = 0, learningLangs_1 = learningLangs;
                _a.label = 3;
            case 3:
                if (!(_i < learningLangs_1.length)) return [3 /*break*/, 6];
                lang = learningLangs_1[_i];
                return [4 /*yield*/, Lang.create({
                        userid: userid,
                        learningLang: lang,
                    })];
            case 4:
                _a.sent();
                _a.label = 5;
            case 5:
                _i++;
                return [3 /*break*/, 3];
            case 6: return [3 /*break*/, 8];
            case 7:
                err_6 = _a.sent();
                next(err_6);
                return [3 /*break*/, 8];
            case 8:
                res.json({
                    msg: 'Learning Languages change completed.',
                    isError: false,
                });
                return [3 /*break*/, 10];
            case 9:
                res.json({
                    msg: 'An Erorr Occurred. Please try Later.',
                    isError: true,
                });
                _a.label = 10;
            case 10: return [2 /*return*/];
        }
    });
}); };
exports.changeUserLang = changeUserLang;
// user name을 수정했을 때 실행되는 함수
var changeUserName = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var name, userid, err_7;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                name = req.body.name;
                userid = req.session.userid;
                if (!userid || userid.length < 4) {
                    return [2 /*return*/, res.status(401).json({
                            msg: 'Please Login First!',
                            isError: true,
                        })];
                }
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, User.update({ name: name }, { where: { userid: userid } })];
            case 2:
                _a.sent();
                res.json({ msg: 'name change completed.', isError: false });
                return [3 /*break*/, 4];
            case 3:
                err_7 = _a.sent();
                res.json({
                    msg: 'An Erorr Occurred. Please try Later.',
                    isError: true,
                });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.changeUserName = changeUserName;
// 회원 탈퇴 시 실행되는 함수
var deleteUser = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var userid, err_8;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                userid = req.session.userid;
                if (!userid || userid.length < 4) {
                    return [2 /*return*/, res.status(401).json({
                            msg: 'Please Login First!',
                            isError: true,
                        })];
                }
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, User.destroy({
                        where: { userid: userid },
                    })];
            case 2:
                _a.sent();
                req.session.userid = '';
                res.json({
                    msg: 'Deletion completed',
                    isError: false,
                });
                return [3 /*break*/, 4];
            case 3:
                err_8 = _a.sent();
                res.json({
                    msg: 'An Erorr Occurred. Please try Later.',
                    isError: true,
                });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.deleteUser = deleteUser;
var editIntroduction = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var content, userid, err_9;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                content = req.body.content;
                userid = req.session.userid;
                if (!userid || userid.length < 4) {
                    return [2 /*return*/, res.status(401).json({
                            msg: 'Please Login First!',
                            isError: true,
                        })];
                }
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, User.update({ introduction: content }, { where: { userid: userid }, returning: true, plain: true })];
            case 2:
                _a.sent();
                console.log(content);
                console.log(userid);
                res.json({ msg: 'introduction change completed.', isError: false });
                return [3 /*break*/, 4];
            case 3:
                err_9 = _a.sent();
                res.json({
                    msg: 'An Erorr Occurred. Please try Later.',
                    isError: true,
                });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.editIntroduction = editIntroduction;
var logout = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        if (req.session.userid && req.session.userid.length > 3) {
            req.session.userid = '';
            res.json({ msg: 'logout completed', idError: false });
        }
        else {
            res.json({ msg: 'Already being logoutted', idError: true });
        }
        return [2 /*return*/];
    });
}); };
exports.logout = logout;
var multerMypage = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var userid, err_10;
    var _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                userid = req.session.userid;
                if (!userid || userid.length < 4) {
                    return [2 /*return*/, res.status(401).json({
                            msg: 'Please Login First!',
                            isError: true,
                        })];
                }
                _c.label = 1;
            case 1:
                _c.trys.push([1, 3, , 4]);
                return [4 /*yield*/, User.update({
                        profileImgPath: "/".concat((_a = req.file) === null || _a === void 0 ? void 0 : _a.path),
                    }, { where: { userid: req.session.userid } })];
            case 2:
                _c.sent();
                return [3 /*break*/, 4];
            case 3:
                err_10 = _c.sent();
                return [2 /*return*/, next(err_10)];
            case 4:
                res.json({ path: "/".concat((_b = req.file) === null || _b === void 0 ? void 0 : _b.path) });
                return [2 /*return*/];
        }
    });
}); };
exports.multerMypage = multerMypage;
var getRevisedLists = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var userid, culs, langs, chats, culPosts, i, j, k, comments, langPosts, comments, revisedChats, nameAndContent, lines, err_11;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                userid = req.session.userid;
                culs = [];
                langs = [];
                chats = [];
                if (!userid || userid.length < 4) {
                    return [2 /*return*/, res.status(401).json({
                            msg: 'Please Login First!',
                            isError: true,
                        })];
                }
                _a.label = 1;
            case 1:
                _a.trys.push([1, 5, , 6]);
                return [4 /*yield*/, Post.findAll({
                        where: { userid: userid },
                        attributes: ['postId'],
                        include: [
                            {
                                model: Comment,
                                attributes: ['content', 'isrevised'],
                            },
                        ],
                    })];
            case 2:
                culPosts = _a.sent();
                i = -1;
                j = void 0, k = void 0;
                while (culPosts[++i]) {
                    if (culPosts[i].Comments) {
                        j = -1;
                        while (culPosts[i].Comments[++j]) {
                            if (culPosts[i].Comments[j].isrevised) {
                                comments = culPosts[i].Comments[j].content.split('&&&&');
                                k = -1;
                                while (comments[++k]) {
                                    if (comments[k].includes('/./')) {
                                        culs.push(comments[k]);
                                    }
                                }
                            }
                        }
                    }
                }
                return [4 /*yield*/, LangPost.findAll({
                        where: { userid: userid },
                        attributes: ['postId'],
                        include: [
                            {
                                model: LangComment,
                                attributes: ['content', 'isrevised'],
                            },
                        ],
                    })];
            case 3:
                langPosts = _a.sent();
                i = -1;
                while (langPosts[++i]) {
                    if (langPosts[i].LangComments) {
                        j = -1;
                        while (langPosts[i].LangComments[++j]) {
                            if (langPosts[i].LangComments[j].isrevised) {
                                comments = langPosts[i].LangComments[j].content.split('&&&&');
                                k = -1;
                                while (comments[++k]) {
                                    if (comments[k].includes('/./')) {
                                        langs.push(comments[k]);
                                    }
                                }
                            }
                        }
                    }
                }
                return [4 /*yield*/, Chat.findAll({
                        where: { isrevised: true, toWhom: userid },
                    })];
            case 4:
                revisedChats = _a.sent();
                i = -1;
                while (revisedChats[++i]) {
                    if (revisedChats[i].content) {
                        nameAndContent = revisedChats[i].content.split('@@.,.@@');
                        lines = nameAndContent[1].split('&&&&');
                        j = -1;
                        while (lines[++j]) {
                            if (lines[j].includes('/./')) {
                                chats.push(lines[j]);
                            }
                        }
                    }
                }
                res.json({
                    langRes: langs,
                    culRes: culs,
                    chatRes: chats,
                    isError: false,
                });
                return [3 /*break*/, 6];
            case 5:
                err_11 = _a.sent();
                console.log('Error occurred:', err_11);
                next(err_11);
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.getRevisedLists = getRevisedLists;
