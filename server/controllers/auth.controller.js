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
exports.existAlready = exports.signup = exports.login = void 0;
var bcrypt = require("bcrypt");
var model_1 = require("../model");
var User = model_1.db.User;
var Lang = model_1.db.Lang;
function login(req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, userid, password, existingUser, err_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = req.body, userid = _a.userid, password = _a.password;
                    if (!userid || userid.trim().length === 0) {
                        return [2 /*return*/, res.json({
                                msg: 'Please input ID.',
                                isLoggedin: false,
                                userid: null,
                            })];
                    }
                    if (!password || password.trim().length === 0) {
                        return [2 /*return*/, res.json({
                                msg: 'Please input Password.',
                                isLoggedin: false,
                                userid: null,
                            })];
                    }
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, User.findOne({ where: { userid: userid } })];
                case 2:
                    existingUser = _b.sent();
                    return [3 /*break*/, 4];
                case 3:
                    err_1 = _b.sent();
                    return [2 /*return*/, res.status(500).json({
                            msg: 'An Error Occurred ',
                            isLoggedin: false,
                            userid: null,
                        })];
                case 4:
                    if (!existingUser) {
                        return [2 /*return*/, res.json({
                                msg: 'No account finded! Check ID and Password input.',
                                isLoggedin: false,
                                userid: null,
                            })];
                    }
                    if (!bcrypt.compareSync(password, existingUser.password)) {
                        return [2 /*return*/, res.json({
                                msg: 'No account finded! Check ID and Password input.',
                                isLoggedin: false,
                                userid: null,
                            })];
                    }
                    req.session.userid = userid;
                    res.json({ msg: null, isLoggedin: true, userid: userid });
                    return [2 /*return*/];
            }
        });
    });
}
exports.login = login;
function signup(req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, userid, password, confirmPassword, name, gender, isUnique, nation, firLang, learningLang, existingUser, err_2, hashPW, result, _i, learningLang_1, lang, err_3;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = req.body, userid = _a.userid, password = _a.password, confirmPassword = _a.confirmPassword, name = _a.name, gender = _a.gender, isUnique = _a.isUnique, nation = _a.nation, firLang = _a.firLang, learningLang = _a.learningLang;
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, User.findOne({
                            where: { userid: req.body.userid },
                        })];
                case 2:
                    existingUser = _b.sent();
                    return [3 /*break*/, 4];
                case 3:
                    err_2 = _b.sent();
                    return [2 /*return*/, next(err_2)];
                case 4:
                    if (!isUnique || JSON.parse(isUnique) == false || existingUser) {
                        return [2 /*return*/, res.json({
                                msg: 'Please Execute ID Valid check',
                                isError: true,
                            })];
                    }
                    if (!userid || userid.trim().length <= 3) {
                        return [2 /*return*/, res.json({
                                msg: 'ID should be at least 4 characters long.',
                                isError: true,
                            })];
                    }
                    if (!password || password.trim().length <= 5) {
                        return [2 /*return*/, res.json({
                                msg: 'Password should be at least 4 characters long.',
                                isError: true,
                            })];
                    }
                    if (!(password === confirmPassword)) {
                        return [2 /*return*/, res.json({
                                msg: "There's a difference between password and confirm password",
                                isError: true,
                            })];
                    }
                    if (!name || name.trim().length < 2) {
                        return [2 /*return*/, res.json({
                                msg: 'Name should be at least 2 characters long',
                                isError: true,
                            })];
                    }
                    if (!(gender === 'm' || gender === 'f')) {
                        return [2 /*return*/, res.json({
                                msg: 'Please Select your Gender.',
                                isError: true,
                            })];
                    }
                    if (!nation || nation.trim().length < 2) {
                        return [2 /*return*/, res.json({
                                msg: 'Please Select your nation.',
                                isError: true,
                            })];
                    }
                    if (!firLang || firLang.trim().length < 2) {
                        return [2 /*return*/, res.json({
                                msg: 'Please Select your first Language.',
                                isError: true,
                            })];
                    }
                    if (!learningLang || learningLang.length < 1) {
                        return [2 /*return*/, res.json({
                                msg: 'Plase Select some Languages at least 1',
                                isError: true,
                            })];
                    }
                    hashPW = bcrypt.hashSync(password, 12);
                    _b.label = 5;
                case 5:
                    _b.trys.push([5, 11, , 12]);
                    return [4 /*yield*/, User.create({
                            userid: userid,
                            name: name,
                            password: hashPW,
                            gender: gender,
                            nation: nation,
                            firLang: firLang,
                        })];
                case 6:
                    result = _b.sent();
                    _i = 0, learningLang_1 = learningLang;
                    _b.label = 7;
                case 7:
                    if (!(_i < learningLang_1.length)) return [3 /*break*/, 10];
                    lang = learningLang_1[_i];
                    return [4 /*yield*/, Lang.create({
                            userid: userid,
                            learningLang: lang,
                        })];
                case 8:
                    _b.sent();
                    _b.label = 9;
                case 9:
                    _i++;
                    return [3 /*break*/, 7];
                case 10: return [3 /*break*/, 12];
                case 11:
                    err_3 = _b.sent();
                    return [2 /*return*/, next(err_3)];
                case 12: return [2 /*return*/, res.json({ msg: null, isError: false })];
            }
        });
    });
}
exports.signup = signup;
function existAlready(req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var userid, existingUser, err_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    userid = req.body.userid;
                    if (userid.trim().length < 4) {
                        return [2 /*return*/, res.json({
                                msg: 'ID should be at least 4 characters long.',
                                isUnique: false,
                            })];
                    }
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, User.findOne({
                            where: { userid: userid },
                        })];
                case 2:
                    existingUser = _a.sent();
                    return [3 /*break*/, 4];
                case 3:
                    err_4 = _a.sent();
                    return [2 /*return*/, next(err_4)];
                case 4:
                    if (existingUser) {
                        res.json({ msg: 'ID already exists.', isUnique: false });
                    }
                    else {
                        res.json({ msg: 'ID can be generated.', isUnique: true });
                    }
                    return [2 /*return*/];
            }
        });
    });
}
exports.existAlready = existAlready;
