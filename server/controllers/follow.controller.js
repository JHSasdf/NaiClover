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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.newAlarmNumGet = exports.getAlarmList = exports.followListGet = exports.followNumGet = exports.unfollow = exports.follow = void 0;
var model_1 = require("../model");
var user = model_1.db.User;
var Follow = model_1.db.Follow;
var Alarm = model_1.db.Alarm;
var setAlarm = function (userid, otherUserId, alarmType) { return __awaiter(void 0, void 0, void 0, function () {
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
function follow(req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var followId, userid, followCheck, error_2, error_3, error_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    followId = req.body.followId;
                    userid = req.session.userid;
                    if (!userid) {
                        userid = '';
                    }
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 12, , 13]);
                    return [4 /*yield*/, Follow.findOne({
                            where: { userid: followId, followerId: userid },
                        })];
                case 2:
                    followCheck = _a.sent();
                    if (!!followCheck) return [3 /*break*/, 8];
                    _a.label = 3;
                case 3:
                    _a.trys.push([3, 6, , 7]);
                    return [4 /*yield*/, Follow.create({ userid: followId, followerId: userid })];
                case 4:
                    _a.sent();
                    return [4 /*yield*/, setAlarm(followId, userid, 1)];
                case 5:
                    _a.sent();
                    return [2 /*return*/, res.json({
                            msg: 'complete',
                            result: true,
                        })];
                case 6:
                    error_2 = _a.sent();
                    return [2 /*return*/, res.json({
                            msg: error_2,
                            result: false,
                        })];
                case 7: return [3 /*break*/, 11];
                case 8:
                    _a.trys.push([8, 10, , 11]);
                    return [4 /*yield*/, Follow.destroy({
                            where: { userid: followId, followerId: userid },
                        })];
                case 9:
                    _a.sent();
                    return [2 /*return*/, res.json({
                            msg: 'follow deleted',
                            result: true,
                        })];
                case 10:
                    error_3 = _a.sent();
                    return [2 /*return*/, res.json({
                            msg: error_3,
                            result: false,
                        })];
                case 11: return [3 /*break*/, 13];
                case 12:
                    error_4 = _a.sent();
                    return [2 /*return*/, res.json({
                            msg: error_4,
                            result: false,
                        })];
                case 13: return [2 /*return*/];
            }
        });
    });
}
exports.follow = follow;
function unfollow(req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, userid, followId, followCheck, error_5, error_6;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = req.body, userid = _a.userid, followId = _a.followId;
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 7, , 8]);
                    return [4 /*yield*/, Follow.findOne({
                            where: { userid: followId, followerId: userid },
                        })];
                case 2:
                    followCheck = _b.sent();
                    if (!followCheck) return [3 /*break*/, 6];
                    _b.label = 3;
                case 3:
                    _b.trys.push([3, 5, , 6]);
                    return [4 /*yield*/, Follow.destroy({
                            where: { userid: followId, followerId: userid },
                        })];
                case 4:
                    _b.sent();
                    return [2 /*return*/, res.json({
                            msg: 'complete',
                            result: true,
                        })];
                case 5:
                    error_5 = _b.sent();
                    return [2 /*return*/, res.json({
                            msg: error_5,
                            result: false,
                        })];
                case 6: return [3 /*break*/, 8];
                case 7:
                    error_6 = _b.sent();
                    return [2 /*return*/, res.json({
                            msg: error_6,
                            result: false,
                        })];
                case 8: return [2 /*return*/];
            }
        });
    });
}
exports.unfollow = unfollow;
function followNumGet(req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var userid, tempObj, followingNumber_1, followerNumber_1, error_7;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    userid = req.query.userid;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, , 5]);
                    return [4 /*yield*/, Follow.findAll({
                            where: { followerId: userid },
                        })];
                case 2:
                    tempObj = _a.sent();
                    followingNumber_1 = 0;
                    followerNumber_1 = 0;
                    tempObj.forEach(function (obj) {
                        followingNumber_1++;
                    });
                    return [4 /*yield*/, Follow.findAll({
                            where: { userid: userid },
                        })];
                case 3:
                    tempObj = _a.sent();
                    tempObj.forEach(function (obj) {
                        followerNumber_1++;
                    });
                    return [2 /*return*/, res.json({
                            followingNumber: followingNumber_1,
                            followerNumber: followerNumber_1,
                            result: true,
                        })];
                case 4:
                    error_7 = _a.sent();
                    return [2 /*return*/, res.json({
                            msg: error_7,
                            result: false,
                        })];
                case 5: return [2 /*return*/];
            }
        });
    });
}
exports.followNumGet = followNumGet;
function followListGet(req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var userid, followingList, followerList, tempUser, tempObj, _i, tempObj_1, obj, _a, tempObj_2, obj, error_8;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    userid = req.query.userid;
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 12, , 13]);
                    followingList = [];
                    followerList = [];
                    tempUser = void 0;
                    return [4 /*yield*/, Follow.findAll({
                            where: { followerId: userid },
                        })];
                case 2:
                    tempObj = _b.sent();
                    _i = 0, tempObj_1 = tempObj;
                    _b.label = 3;
                case 3:
                    if (!(_i < tempObj_1.length)) return [3 /*break*/, 6];
                    obj = tempObj_1[_i];
                    return [4 /*yield*/, user.findOne({ where: { userid: obj.userid } })];
                case 4:
                    tempUser = _b.sent();
                    followingList.push(tempUser);
                    _b.label = 5;
                case 5:
                    _i++;
                    return [3 /*break*/, 3];
                case 6: return [4 /*yield*/, Follow.findAll({
                        where: { userid: userid },
                    })];
                case 7:
                    tempObj = _b.sent();
                    _a = 0, tempObj_2 = tempObj;
                    _b.label = 8;
                case 8:
                    if (!(_a < tempObj_2.length)) return [3 /*break*/, 11];
                    obj = tempObj_2[_a];
                    return [4 /*yield*/, user.findOne({
                            where: { userid: obj.followerId },
                        })];
                case 9:
                    tempUser = _b.sent();
                    followerList.push(tempUser);
                    _b.label = 10;
                case 10:
                    _a++;
                    return [3 /*break*/, 8];
                case 11: return [2 /*return*/, res.json({
                        followingList: followingList,
                        followerList: followerList,
                        result: true,
                    })];
                case 12:
                    error_8 = _b.sent();
                    return [2 /*return*/, res.json({
                            msg: error_8,
                            result: false,
                        })];
                case 13: return [2 /*return*/];
            }
        });
    });
}
exports.followListGet = followListGet;
function getAlarmList(req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var userid, checkedList, uncheckedList, _i, checkedList_1, element, error_9;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    userid = req.query.userid;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 7, , 8]);
                    return [4 /*yield*/, Alarm.findAll({
                            where: { userid: userid },
                        })];
                case 2:
                    checkedList = _a.sent();
                    uncheckedList = __spreadArray([], checkedList, true);
                    _i = 0, checkedList_1 = checkedList;
                    _a.label = 3;
                case 3:
                    if (!(_i < checkedList_1.length)) return [3 /*break*/, 6];
                    element = checkedList_1[_i];
                    return [4 /*yield*/, Alarm.update({ checked: true }, { where: { index: element.index } })];
                case 4:
                    _a.sent();
                    _a.label = 5;
                case 5:
                    _i++;
                    return [3 /*break*/, 3];
                case 6: return [2 /*return*/, res.json({
                        list: uncheckedList,
                        result: true,
                    })];
                case 7:
                    error_9 = _a.sent();
                    return [2 /*return*/, res.json({
                            msg: error_9,
                            result: false,
                        })];
                case 8: return [2 /*return*/];
            }
        });
    });
}
exports.getAlarmList = getAlarmList;
function newAlarmNumGet(req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var userid, tempObj, newAlarmNumber_1, error_10;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    userid = req.query.userid;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, Alarm.findAll({
                            where: { userid: userid, checked: false },
                        })];
                case 2:
                    tempObj = _a.sent();
                    newAlarmNumber_1 = 0;
                    tempObj.forEach(function (obj) {
                        newAlarmNumber_1++;
                    });
                    return [2 /*return*/, res.json({
                            newAlarmNumber: newAlarmNumber_1,
                            result: true,
                        })];
                case 3:
                    error_10 = _a.sent();
                    return [2 /*return*/, res.json({
                            msg: error_10,
                            result: false,
                        })];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.newAlarmNumGet = newAlarmNumGet;
