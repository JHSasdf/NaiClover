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
exports.getChatLog = exports.getMonoRooms = exports.getPersonalRooms = void 0;
var model_1 = require("../model");
var sequelize_1 = require("sequelize");
var sequelize = require('sequelize');
var User = model_1.db.User;
var Room = model_1.db.Room;
var Chat = model_1.db.Chat;
var ChatCount = model_1.db.ChatCount;
var CurrentNOPIM = model_1.db.CurrentNOPIM;
// room 보여주는 홈페이지에서 1:1 채팅방 목록 보여주는 함수
var getPersonalRooms = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var userid, results, sortedResults, _loop_1, _i, results_1, result, err_1;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                userid = req.session.userid;
                if (!userid || userid.length < 4) {
                    return [2 /*return*/, res.status(401).json({
                            msg: 'Please Login First!',
                            isError: true,
                        })];
                }
                _b.label = 1;
            case 1:
                _b.trys.push([1, 7, , 8]);
                return [4 /*yield*/, Room.findAll({
                        where: (_a = {},
                            _a[sequelize_1.Op.or] = [{ userid: userid }, { useridTo: userid }],
                            _a[sequelize_1.Op.not] = [{ useridTo: 'monoChat' }],
                            _a),
                        include: [
                            {
                                model: Chat,
                                order: [['createdAt', 'DESC']],
                                limit: 1,
                            },
                            {
                                model: ChatCount,
                                where: { useridTo: userid },
                                limit: 300,
                            },
                        ],
                    })];
            case 2:
                results = _b.sent();
                _loop_1 = function (result) {
                    var existingUserid, existingUseridTo, myUserNameData, myUserName, existingArr, final;
                    return __generator(this, function (_c) {
                        switch (_c.label) {
                            case 0: return [4 /*yield*/, User.findOne({
                                    where: { userid: result.dataValues.userid },
                                    attributes: ['name', 'nation', 'profileImgPath'],
                                })];
                            case 1:
                                existingUserid = _c.sent();
                                return [4 /*yield*/, User.findOne({
                                        where: { userid: result.dataValues.useridTo },
                                        attributes: ['name', 'nation', 'profileImgPath'],
                                    })];
                            case 2:
                                existingUseridTo = _c.sent();
                                return [4 /*yield*/, User.findOne({
                                        where: { userid: userid },
                                        attributes: ['name', 'nation', 'profileImgPath'],
                                    })];
                            case 3:
                                myUserNameData = _c.sent();
                                myUserName = myUserNameData.dataValues.name;
                                existingArr = [
                                    existingUserid.dataValues,
                                    existingUseridTo.dataValues,
                                ];
                                final = existingArr.filter(function (elem) {
                                    return elem.name !== myUserName;
                                });
                                result.dataValues.realRoomName = final;
                                return [2 /*return*/];
                        }
                    });
                };
                _i = 0, results_1 = results;
                _b.label = 3;
            case 3:
                if (!(_i < results_1.length)) return [3 /*break*/, 6];
                result = results_1[_i];
                return [5 /*yield**/, _loop_1(result)];
            case 4:
                _b.sent();
                _b.label = 5;
            case 5:
                _i++;
                return [3 /*break*/, 3];
            case 6:
                sortedResults = results.sort(function (a, b) {
                    return (b.dataValues.Chats[b.Chats.length - 1].createdAt -
                        a.dataValues.Chats[a.Chats.length - 1].createdAt);
                });
                return [3 /*break*/, 8];
            case 7:
                err_1 = _b.sent();
                return [2 /*return*/, next(err_1)];
            case 8:
                // personalRooms.realRoomName이 1:1 채팅에서 상대방의 이름
                res.json({
                    personalRooms: sortedResults,
                    isError: false,
                });
                return [2 /*return*/];
        }
    });
}); };
exports.getPersonalRooms = getPersonalRooms;
// room 보여주는 홈페이지에서 모노 채팅방 목록 보여주는 함수
var getMonoRooms = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var userid, results, _i, results_2, result, numberOfPeople, userInfo, err_2;
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
                _a.trys.push([1, 8, , 9]);
                return [4 /*yield*/, Room.findAll({
                        where: {
                            useridTo: 'monoChat',
                        },
                        attributes: [
                            'roomNum',
                            'roomName',
                            'userid',
                            'restrictedLang',
                            'createdAt',
                        ],
                        include: [
                            {
                                model: Chat,
                                order: [['createdAt', 'DESC']],
                                limit: 1,
                            },
                            {
                                model: ChatCount,
                                limit: 1,
                                where: { useridTo: userid },
                            },
                            {
                                model: CurrentNOPIM,
                            },
                        ],
                    })];
            case 2:
                results = _a.sent();
                _i = 0, results_2 = results;
                _a.label = 3;
            case 3:
                if (!(_i < results_2.length)) return [3 /*break*/, 7];
                result = results_2[_i];
                return [4 /*yield*/, Chat.count({
                        distinct: true,
                        col: 'userid',
                        where: { roomNum: result.dataValues.roomNum },
                    })];
            case 4:
                numberOfPeople = _a.sent();
                if (numberOfPeople === 0) {
                    numberOfPeople = 1;
                }
                result.dataValues.numberOfPeople = numberOfPeople;
                return [4 /*yield*/, User.findOne({
                        where: { userid: result.dataValues.userid },
                        attributes: ['name', 'nation', 'profileImgPath'],
                    })];
            case 5:
                userInfo = _a.sent();
                result.dataValues.userInfo = userInfo;
                _a.label = 6;
            case 6:
                _i++;
                return [3 /*break*/, 3];
            case 7: return [3 /*break*/, 9];
            case 8:
                err_2 = _a.sent();
                return [2 /*return*/, next(err_2)];
            case 9:
                res.json({
                    monoRooms: results,
                    isError: false,
                });
                return [2 /*return*/];
        }
    });
}); };
exports.getMonoRooms = getMonoRooms;
var getChatLog = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var roomNum, userid, roomInfo, existingUserid1, existingUserid2, existingUseridArr, sortedExistingUseridArr, usernameTo, chatNumber, isFirst, username, usernameTo, results, _i, results_3, result, chatCounting, err_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                roomNum = req.params.id;
                userid = req.session.userid;
                if (!userid || userid.length < 4) {
                    return [2 /*return*/, res.status(401).json({
                            msg: 'Please Login First!',
                            isError: true,
                        })];
                }
                _a.label = 1;
            case 1:
                _a.trys.push([1, 17, , 18]);
                return [4 /*yield*/, Room.findOne({
                        where: { roomNum: roomNum },
                    })];
            case 2:
                roomInfo = _a.sent();
                if (!roomInfo) {
                    return [2 /*return*/, res
                            .status(404)
                            .json({ msg: "There's no Chat Room", isError: true })];
                }
                if (!(roomInfo.dataValues.useridTo !== 'monoChat')) return [3 /*break*/, 4];
                existingUserid1 = roomInfo.dataValues.userid;
                existingUserid2 = roomInfo.dataValues.useridTo;
                existingUseridArr = [existingUserid1, existingUserid2];
                sortedExistingUseridArr = existingUseridArr.filter(function (elem) {
                    return elem !== userid;
                });
                return [4 /*yield*/, User.findOne({
                        where: { userid: sortedExistingUseridArr },
                        attributes: ['name'],
                    })];
            case 3:
                usernameTo = _a.sent();
                roomInfo.dataValues.roomName = usernameTo.dataValues.name;
                _a.label = 4;
            case 4: return [4 /*yield*/, Chat.count({
                    col: 'userid',
                    distinct: true,
                    where: { roomNum: roomNum },
                })];
            case 5:
                chatNumber = _a.sent();
                if (roomInfo.dataValues.useridTo !== 'monoChat' &&
                    !(roomInfo.dataValues.userid === userid ||
                        roomInfo.dataValues.useridTo === userid)) {
                    return [2 /*return*/, res.status(403).json({
                            msg: "Not authenticated User entranced!",
                            isError: true,
                        })];
                }
                ChatCount.destroy({
                    where: { roomNum: roomNum, useridTo: userid },
                });
                return [4 /*yield*/, Chat.findOne({
                        where: { roomNum: roomNum, userid: userid, isFirst: true },
                    })];
            case 6:
                isFirst = _a.sent();
                if (!!isFirst) return [3 /*break*/, 11];
                return [4 /*yield*/, User.findOne({
                        where: { userid: userid },
                        attributes: ['name'],
                    })];
            case 7:
                username = _a.sent();
                return [4 /*yield*/, User.findOne({
                        where: { userid: roomInfo.dataValues.useridTo },
                        attributes: ['name'],
                    })];
            case 8:
                usernameTo = _a.sent();
                return [4 /*yield*/, Chat.create({
                        roomNum: roomNum,
                        userid: userid,
                        content: "".concat(username.dataValues.name, "\uB2D8\uC774 \uC785\uC7A5\uD558\uC168\uC2B5\uB2C8\uB2E4."),
                        isFirst: true,
                    })];
            case 9:
                _a.sent();
                if (!(roomInfo.dataValues.useridTo !== 'monoChat')) return [3 /*break*/, 11];
                return [4 /*yield*/, Chat.create({
                        roomNum: roomNum,
                        userid: roomInfo.dataValues.useridTo,
                        content: "".concat(usernameTo.dataValues.name, "\uB2D8\uC774 \uC785\uC7A5\uD558\uC168\uC2B5\uB2C8\uB2E4."),
                        isFirst: true,
                    })];
            case 10:
                _a.sent();
                _a.label = 11;
            case 11: return [4 /*yield*/, Chat.findAll({
                    where: { roomNum: roomNum },
                    include: [
                        {
                            model: User,
                            attributes: ['profileImgPath', 'name', 'nation'],
                        },
                    ],
                })];
            case 12:
                results = _a.sent();
                _i = 0, results_3 = results;
                _a.label = 13;
            case 13:
                if (!(_i < results_3.length)) return [3 /*break*/, 16];
                result = results_3[_i];
                return [4 /*yield*/, ChatCount.count({
                        attributes: [
                            [
                                sequelize.fn('COUNT', sequelize.literal('DISTINCT useridTo')),
                                'userCount',
                            ],
                        ],
                        where: {
                            roomNum: roomNum,
                            chatIndex: result.dataValues.chatIndex,
                        },
                    })];
            case 14:
                chatCounting = _a.sent();
                result.dataValues.chatCounting = chatCounting;
                _a.label = 15;
            case 15:
                _i++;
                return [3 /*break*/, 13];
            case 16:
                res.json({
                    chatLog: results,
                    roomInfo: roomInfo,
                    chatNumber: chatNumber,
                });
                return [3 /*break*/, 18];
            case 17:
                err_3 = _a.sent();
                return [2 /*return*/, next(err_3)];
            case 18: return [2 /*return*/];
        }
    });
}); };
exports.getChatLog = getChatLog;
