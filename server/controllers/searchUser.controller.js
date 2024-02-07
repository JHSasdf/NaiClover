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
exports.getUserInfo = void 0;
var model_1 = require("../model");
var User = model_1.db.User;
var Lang = model_1.db.Lang;
var Follow = model_1.db.Follow;
var Post = model_1.db.Post;
var Comment = model_1.db.Comment;
var PostLike = model_1.db.PostLike;
var PostImage = model_1.db.PostImages;
var LangPost = model_1.db.LangPost;
var LangComment = model_1.db.LangComment;
var LangPostLike = model_1.db.LangPostLike;
// mypage에 들어가서 page가 render되면 useEffect와 axios로 정보를 가져오는 함수
var getUserInfo = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var userid, userDataObj, learningLangObjArr, isFollowing, followerCount, followingCount, myUserid, err_1, err_2, learningLang, _i, learningLangObjArr_1, existingLangsObj, postCulDatas, postLangDatas, isFollowingData, err_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                userid = req.params.id;
                learningLangObjArr = [];
                isFollowing = false;
                myUserid = req.session.userid;
                if (!myUserid || myUserid.length < 4) {
                    req.session.userid = '';
                }
                if (!userid || userid == '' || userid === null) {
                    return [2 /*return*/, res.json({
                            msg: 'Something went wrong! please try it later!',
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
                    return [2 /*return*/, res.status(404).json({ msg: 'User not founded', isError: true })];
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
                _a.trys.push([9, 15, , 16]);
                return [4 /*yield*/, Post.findAll({
                        where: { userid: userid },
                        include: [
                            {
                                model: User,
                                attributes: ['name', 'gender', 'nation', 'profileImgPath'],
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
                                model: LangComment,
                            },
                            {
                                model: LangPostLike,
                            },
                        ],
                    })];
            case 11:
                postLangDatas = _a.sent();
                return [4 /*yield*/, Follow.count({
                        where: {
                            userid: userid,
                        },
                    })];
            case 12:
                followerCount = _a.sent();
                return [4 /*yield*/, Follow.count({
                        where: {
                            followerId: userid,
                        },
                    })];
            case 13:
                followingCount = _a.sent();
                return [4 /*yield*/, Follow.findOne({
                        where: {
                            followerId: myUserid,
                            userid: userid,
                        },
                    })];
            case 14:
                isFollowingData = _a.sent();
                if (isFollowingData) {
                    isFollowing = true;
                }
                return [3 /*break*/, 16];
            case 15:
                err_3 = _a.sent();
                return [2 /*return*/, next(err_3)];
            case 16:
                res.json({
                    userDataObj: userDataObj,
                    learningLang: learningLang,
                    postCulDatas: postCulDatas,
                    postLangDatas: postLangDatas,
                    followerCount: followerCount,
                    followingCount: followingCount,
                    isFollowing: isFollowing,
                });
                return [2 /*return*/];
        }
    });
}); };
exports.getUserInfo = getUserInfo;
