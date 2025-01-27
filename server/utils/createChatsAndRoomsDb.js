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
exports.createChatDb = exports.createPersonalRoomDb = exports.updatePeopleInMonoRoom = exports.createMonoRoomDb = exports.generateUniqueId = void 0;
var model_1 = require("../model");
var sequelize_1 = require("sequelize");
var sequelize = require('sequelize');
var CurrentNOPIM = model_1.db.CurrentNOPIM;
var Room = model_1.db.Room;
var Chat = model_1.db.Chat;
var ChatCount = model_1.db.ChatCount;
var generateUniqueId = function () {
    return Math.random().toString(36).substr(2, 9);
};
exports.generateUniqueId = generateUniqueId;
function createMonoRoomDb(roomName, userid, useridTo, restrictedLang, roomNumArr) {
    return __awaiter(this, void 0, void 0, function () {
        var result, genaratedUniqueId, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    genaratedUniqueId = (0, exports.generateUniqueId)();
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, , 5]);
                    return [4 /*yield*/, Room.create({
                            roomNum: genaratedUniqueId,
                            roomName: roomName,
                            userid: userid,
                            useridTo: useridTo,
                            restrictedLang: restrictedLang,
                        })];
                case 2:
                    result = _a.sent();
                    return [4 /*yield*/, CurrentNOPIM.create({
                            roomNum: genaratedUniqueId,
                            numberOfPeople: 0,
                        })];
                case 3:
                    _a.sent();
                    return [3 /*break*/, 5];
                case 4:
                    err_1 = _a.sent();
                    console.log(err_1);
                    return [3 /*break*/, 5];
                case 5:
                    roomNumArr.push(result.roomNum);
                    return [2 /*return*/];
            }
        });
    });
}
exports.createMonoRoomDb = createMonoRoomDb;
function updatePeopleInMonoRoom(roomClients, room) {
    CurrentNOPIM.update({
        numberOfPeople: roomClients,
    }, {
        where: { roomNum: room },
    });
}
exports.updatePeopleInMonoRoom = updatePeopleInMonoRoom;
function createPersonalRoomDb(roomName, userid, useridTo, roomNumArr) {
    return __awaiter(this, void 0, void 0, function () {
        var result, genaratedUniqueId, validCheck, validCheck2, err_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    genaratedUniqueId = (0, exports.generateUniqueId)();
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 5, , 6]);
                    return [4 /*yield*/, Room.findOne({
                            where: {
                                userid: userid,
                                useridTo: useridTo,
                            },
                        })];
                case 2:
                    validCheck = _a.sent();
                    return [4 /*yield*/, Room.findOne({
                            where: {
                                userid: useridTo,
                                useridTo: userid,
                            },
                        })];
                case 3:
                    validCheck2 = _a.sent();
                    if (validCheck) {
                        return [2 /*return*/, roomNumArr.push(validCheck.dataValues.roomNum)];
                    }
                    if (validCheck2) {
                        return [2 /*return*/, roomNumArr.push(validCheck2.dataValues.roomNum)];
                    }
                    return [4 /*yield*/, Room.create({
                            roomNum: genaratedUniqueId,
                            roomName: roomName,
                            userid: userid,
                            useridTo: useridTo,
                            restrictedLang: null,
                        })];
                case 4:
                    result = _a.sent();
                    return [3 /*break*/, 6];
                case 5:
                    err_2 = _a.sent();
                    console.log(err_2);
                    return [3 /*break*/, 6];
                case 6:
                    roomNumArr.push(result.dataValues.roomNum);
                    return [2 /*return*/];
            }
        });
    });
}
exports.createPersonalRoomDb = createPersonalRoomDb;
function createChatDb(roomNum, userid, content, isrevised, toWhom) {
    if (isrevised === void 0) { isrevised = false; }
    if (toWhom === void 0) { toWhom = null; }
    return __awaiter(this, void 0, void 0, function () {
        var result, peopleInChatRoom, _i, peopleInChatRoom_1, personInChatRoom, err_3;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, Chat.create({
                            roomNum: roomNum,
                            userid: userid,
                            content: content,
                            isrevised: isrevised,
                            toWhom: toWhom,
                        })];
                case 1:
                    result = _b.sent();
                    return [4 /*yield*/, Chat.findAll({
                            attributes: [[sequelize.literal('DISTINCT userid'), 'userid']],
                            where: (_a = {
                                    roomNum: roomNum
                                },
                                _a[sequelize_1.Op.not] = [{ userid: userid }],
                                _a),
                        })];
                case 2:
                    peopleInChatRoom = _b.sent();
                    for (_i = 0, peopleInChatRoom_1 = peopleInChatRoom; _i < peopleInChatRoom_1.length; _i++) {
                        personInChatRoom = peopleInChatRoom_1[_i];
                        ChatCount.create({
                            roomNum: roomNum,
                            chatIndex: result.dataValues.chatIndex,
                            userid: userid,
                            useridTo: personInChatRoom.dataValues.userid,
                        });
                    }
                    return [3 /*break*/, 4];
                case 3:
                    err_3 = _b.sent();
                    console.log(err_3);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.createChatDb = createChatDb;
