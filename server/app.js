"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
exports.io = exports.server = void 0;
require("dotenv/config");
var express = require('express');
var cors = require('cors');
var session = require('express-session');
var http = require('http');
var socket_io_1 = require("socket.io");
var auth_routes_1 = require("./routes/auth.routes");
var mypage_routes_1 = require("./routes/mypage.routes");
var follow_routes_1 = require("./routes/follow.routes");
var post_routes_1 = require("./routes/post.routes");
var langPost_routes_1 = require("./routes/langPost.routes");
var userSearch_routes_1 = require("./routes/userSearch.routes");
var chat_routes_1 = require("./routes/chat.routes");
var postSearch_routes_1 = require("./routes/postSearch.routes");
var model_1 = require("./model");
var handleErrors = require('./middlewares/errorHandler.middleware');
var notFoundHandler = require('./middlewares/notFound.middleware');
var session_config_1 = require("./config/session.config");
var createChatsAndRoomsDb_1 = require("./utils/createChatsAndRoomsDb");
var path = require('path');
var app = express();
exports.server = http.createServer(app);
exports.io = new socket_io_1.Server(exports.server, {
    cors: {
        origin: process.env.CLIENTURL,
        methods: '*',
    },
});
var Room = model_1.db.Room;
app.use('/public', express.static(__dirname + '/public'));
app.use(session((0, session_config_1.getSessionConfig)()));
app.use(express.static(path.join(__dirname, '/../client/build')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors({
    credentials: true,
    origin: [process.env.CLIENTURL, "https://".concat(process.env.SERVERIPNO)],
    methods: ['GET', 'POST', 'PATCH', 'DELETE'], // 'patch' 대신 'PATCH' 사용
}));
var connectedClients = {};
app.use(auth_routes_1.authRouter);
app.use(mypage_routes_1.myPageRouter);
app.use(follow_routes_1.followRouter);
app.use(post_routes_1.postsRouter);
app.use(langPost_routes_1.langPostsRouter);
app.use(userSearch_routes_1.userSearchRouter);
app.use(chat_routes_1.chatRouter);
app.use(postSearch_routes_1.postSearchRouter);
// 사용자의 채팅방 정보를 저장하는 변수
var userChatRooms = {};
var chatRooms = {}; // chatRooms 변수 선언
// 사용자의 채팅방 정보를 저장하는 함수 (데이터베이스)
var saveUserChatRoom = function (userId, roomId) {
    if (!userChatRooms[userId]) {
        userChatRooms[userId] = [];
    }
    userChatRooms[userId].push(roomId);
};
// 사용자의 채팅방 정보를 제거하는 함수 (데이터베이스)
var removeUserChatRoom = function (userId, roomId) {
    if (userChatRooms[userId]) {
        userChatRooms[userId] = userChatRooms[userId].filter(function (r) { return r !== roomId; });
    }
};
app.get('/fetch/language/:roomId', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var roomId, room;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                roomId = req.params.roomId;
                return [4 /*yield*/, Room.findOne({ where: { roomNum: roomId } })];
            case 1:
                room = _a.sent();
                if (room) {
                    res.json({ language: room.restrictedLang || '' });
                }
                else {
                    res.status(404).json({ error: 'Room not founded' });
                }
                return [2 /*return*/];
        }
    });
}); });
var chatRoomLanguages = {};
exports.io.on('connection', function (socket) {
    socket.on('joinRoom', function (room) {
        socket.join(room);
        var roomClients = exports.io.sockets.adapter.rooms.get(room);
        var numberOfClients;
        if (!roomClients) {
            numberOfClients = 0;
        }
        else {
            numberOfClients = roomClients.size;
        }
        (0, createChatsAndRoomsDb_1.updatePeopleInMonoRoom)(numberOfClients, room);
        exports.io.emit('needReload', 'reload');
    });
    socket.on('leaveRoom', function (room) {
        socket.leave(room);
        var roomClients = exports.io.sockets.adapter.rooms.get(room);
        var numberOfClients;
        if (!roomClients) {
            numberOfClients = 0;
        }
        else {
            numberOfClients = roomClients.size;
        }
        (0, createChatsAndRoomsDb_1.updatePeopleInMonoRoom)(numberOfClients, room);
        exports.io.emit('needReload', 'reload');
        removeUserChatRoom(socket.id, room); // 사용자의 채팅방 정보에서 제거
        console.log("User ".concat(socket.id, " left room ").concat(room));
        socket.on('languageChanged', function (_a) {
            var roomId = _a.roomId, selectedLanguage = _a.selectedLanguage;
            // 1. 채팅방 별로 언어 설정 정보 저장
            chatRoomLanguages[roomId] = selectedLanguage;
            // 2. 해당 채팅방에 속한 모든 유저에게 언어 설정 전파
            exports.io.to(roomId).emit('languageChanged', {
                roomId: roomId,
                selectedLanguage: selectedLanguage,
            });
        });
    });
    connectedClients[socket.id] = socket;
    // 여기서 사용자의 ID를 전달합니다.
    socket.emit('userId', socket.id);
    socket.on('chat message', function (msg) {
        if (msg.room) {
            var serverMessage = "Server: ".concat(msg.text);
            var isSentByMe = msg.isSentByMe || false;
            // userId 추가
            socket.broadcast.to(msg.room).emit('chat message', __assign(__assign({}, msg), { text: serverMessage, isSentByMe: isSentByMe, userId: msg.userId }));
            if (msg.isrevised) {
                (0, createChatsAndRoomsDb_1.createChatDb)(msg.room, msg.userId, msg.text, msg.isrevised, msg.toWhom);
            }
            else {
                (0, createChatsAndRoomsDb_1.createChatDb)(msg.room, msg.userId, msg.text, msg.isrevised);
            }
            exports.io.emit('needReload', 'reload');
        }
    });
    socket.on('disconnect', function () {
        delete connectedClients[socket.id];
    });
    socket.on('createRoom', function (_a) {
        var roomName = _a.roomName, userid = _a.userid, useridTo = _a.useridTo, restrictedLang = _a.restrictedLang;
        var roomNumArr = [];
        (useridTo === 'monoChat'
            ? (0, createChatsAndRoomsDb_1.createMonoRoomDb)(roomName, userid, useridTo, restrictedLang, roomNumArr)
            : (0, createChatsAndRoomsDb_1.createPersonalRoomDb)(roomName, userid, useridTo, roomNumArr)).then(function () {
            var inviteCode = generateInviteCode();
            chatRooms[roomNumArr[roomNumArr.length - 1]] = {
                id: roomNumArr[roomNumArr.length - 1],
                name: roomName,
                inviteCode: inviteCode,
            };
            socket.emit('roomCreated', {
                roomNum: roomNumArr[roomNumArr.length - 1],
                roomName: roomName,
                roomNumArr: roomNumArr,
            });
            // userId 추가
            exports.io.to(roomNumArr[roomNumArr.length - 1]).emit('roomCreated', {
                roomNum: roomNumArr[roomNumArr.length - 1],
                roomName: roomName,
                roomNumArr: roomNumArr,
                userId: socket.id,
            });
            saveUserChatRoom(socket.id, roomNumArr[roomNumArr.length - 1]); // 사용자의 채팅방 정보 저장
            console.log("User ".concat(socket.id, " created and joined room ").concat(roomNumArr[roomNumArr.length - 1]));
        });
    });
    socket.on('joinRoomByInviteCode', function (inviteCode) {
        var room = findRoomByInviteCode(inviteCode);
        if (room) {
            socket.join(room.id);
            socket.emit('joinedRoom', room.id);
        }
        else {
            socket.emit('invalidInviteCode');
        }
    });
});
var generateInviteCode = function () {
    return Math.random().toString(36).substr(2, 8);
};
var findRoomByInviteCode = function (inviteCode) {
    return Object.values(chatRooms).find(function (room) { return room.inviteCode === inviteCode; });
};
app.get('/api/chatRooms', function (req, res) {
    res.json(Object.values(chatRooms));
});
app.get('/api/chatRooms/:roomId', function (req, res) {
    var roomId = req.params.roomId;
    var room = chatRooms[roomId];
    if (room) {
        res.json(room);
    }
    else {
        res.status(404).json({ error: 'Room not found' });
    }
});
// 에러처리 핸들러, 요청, 응답의 제일 아래가야함.
app.use(handleErrors);
app.use(notFoundHandler);
model_1.db.sequelize
    .sync({ force: false })
    .then(function () {
    exports.server.listen(process.env.SERVERPORT, function () {
        console.log("Server is running on ".concat(process.env.SERVERURL));
    });
})
    .catch(function (err) {
    console.log(err);
});
