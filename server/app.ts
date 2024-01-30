declare module 'express-session' {
    interface SessionData {
        userid: string; // string으로 수정
    }
}

import express, { Request, Response } from 'express';
import cors from 'cors';
import session from 'express-session';
import http from 'http';
import { Server, Socket } from 'socket.io';
import { authRouter } from './routes/auth.routes';
import { myPageRouter } from './routes/mypage.routes';
import { followRouter } from './routes/follow.routes';
import { postsRouter } from './routes/post.routes';
import { langPostsRouter } from './routes/langPost.routes';
import { userSearchRouter } from './routes/userSearch.routes';
import { chatRouter } from './routes/chat.routes';

import { db } from './model';
import handleErrors from './middlewares/errorHandler.middleware';
import notFoundHandler from './middlewares/notFound.middleware';
import { getSessionConfig } from './config/session.config';

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: 'http://localhost:3000',
        methods: '*',
    },
});

app.use('/public', express.static(__dirname + '/public'));
app.use(session(getSessionConfig()));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
    cors({
        credentials: true,
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST', 'PATCH', 'DELETE'], // 'patch' 대신 'PATCH' 사용
    })
);

const connectedClients: Record<string, Socket> = {};

app.use(authRouter);
app.use(myPageRouter);
app.use(followRouter);
app.use(postsRouter);
app.use(langPostsRouter);
app.use(userSearchRouter);
app.use(chatRouter);

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/App.tsx');
});

// 사용자의 채팅방 정보를 저장하는 변수
const userChatRooms: Record<string, string[]> = {};
const chatRooms: Record<
    string,
    { id: string; name: string; inviteCode: string }
> = {}; // chatRooms 변수 선언

// 사용자의 채팅방 정보를 저장하는 함수 (데이터베이스)
const saveUserChatRoom = (userId: string, roomId: string) => {
    if (!userChatRooms[userId]) {
        userChatRooms[userId] = [];
    }

    userChatRooms[userId].push(roomId);

    console.log(`User ${userId} joined room ${roomId}`);
};

// 사용자의 채팅방 정보를 제거하는 함수 (데이터베이스)
const removeUserChatRoom = (userId: string, roomId: string) => {
    if (userChatRooms[userId]) {
        userChatRooms[userId] = userChatRooms[userId].filter(
            (r) => r !== roomId
        );

        console.log(`User ${userId} left room ${roomId}`);
    }
};
//

const User = db.User;
const Chat = db.Chat;
const Room = db.Room;
let roomNum: string;
const generateUniqueId = () => {
    return Math.random().toString(36).substr(2, 9);
};

async function createMonoRoomDb(
    roomName: string,
    userid: string,
    useridTo: string,
    restrictedLang: string,
    roomNumArr: Array<String>
) {
    let result;
    const genaratedUniqueId = generateUniqueId();
    try {
        result = await Room.create({
            roomNum: genaratedUniqueId,
            roomName: roomName,
            userid: userid,
            useridTo: useridTo,
            restrictedLang: restrictedLang,
        });
    } catch (err) {
        console.log(err);
    }
    roomNumArr.push(result.roomNum);
    roomNum = result.roomNum;
}

async function createPersonalRoomDb(
    roomName: string,
    userid: string,
    useridTo: string,
    roomNumArr: Array<String>
) {
    let result;
    const genaratedUniqueId = generateUniqueId();
    try {
        const validCheck = await Room.findOne({
            where: {
                userid: userid,
                useridTo: useridTo,
            },
        });
        if (validCheck) {
            roomNumArr.push(validCheck.dataValues.roomNum);
            return;
        }
        result = await Room.create({
            roomNum: genaratedUniqueId,
            roomName: roomName,
            userid: userid,
            useridTo: useridTo,
            restrictedLang: null,
        });
    } catch (err) {
        console.log(err);
    }
    console.log(result.dataValues.roomNum);
    roomNumArr.push(result.dataValues.roomNum);
    roomNum = result.roomNum;
    return;
}

async function createChatDb(roomNum: string, userid: string, content: string) {
    let result;
    try {
        result = await Chat.create({
            roomNum: roomNum,
            userid: userid,
            content: content,
        });
    } catch (err) {
        console.log(err);
    }
}
app.get('/fetch/language/:roomId', async (req: Request, res: Response) => {
    const roomId = req.params.roomId;
    const room = await Room.findOne({ where: { roomNum: roomId } });

    if (room) {
        res.json({ language: room.restrictedLang || '' });
    } else {
        res.status(404).json({ error: 'Room not found' });
    }
});

app.get('/getchatlog/:id', async function (req, res, next) {
    const roomNum = req.params.id;
    const result = await Chat.findAll({
        where: { roomNum: roomNum },
        include: [
            {
                model: User,
                attributes: ['profileImgPath', 'name'],
            },
        ],
    });

    res.json({ chatLog: result });
});
const chatRoomLanguages: Record<string, string> = {};
io.on('connection', (socket: Socket) => {
    socket.on('joinRoom', (room) => {
        socket.join(room);
    });

    socket.on('leaveRoom', (room) => {
        socket.leave(room);
        removeUserChatRoom(socket.id, room); // 사용자의 채팅방 정보에서 제거
        console.log(`User ${socket.id} left room ${room}`);
        socket.on('languageChanged', ({ roomId, selectedLanguage }) => {
            // 1. 채팅방 별로 언어 설정 정보 저장
            chatRoomLanguages[roomId] = selectedLanguage;

            // 2. 해당 채팅방에 속한 모든 유저에게 언어 설정 전파
            io.to(roomId).emit('languageChanged', {
                roomId,
                selectedLanguage,
            });
        });
    });

    connectedClients[socket.id] = socket;

    // 여기서 사용자의 ID를 전달합니다.
    socket.emit('userId', socket.id);

    socket.on('chat message', (msg) => {
        if (msg.text.startsWith('You:')) {
            console.log(`You: ${msg.text}`);
        } else {
            console.log(`Server: ${msg.text}`);
        }

        if (msg.room) {
            const serverMessage = `Server: ${msg.text}`;
            const isSentByMe = msg.isSentByMe || false;

            // userId 추가
            socket.broadcast.to(msg.room).emit('chat message', {
                ...msg,
                text: serverMessage,
                isSentByMe,
                userId: msg.userId, // 클라이언트에서 전달받은 userId 사용
            });

            console.log(serverMessage);
            console.log(msg.userId); // userId 출력
            createChatDb(msg.room, msg.userId, msg.text);
        }
    });

    socket.on('disconnect', () => {
        console.log('user disconnected');
        delete connectedClients[socket.id];
    });

    socket.on(
        'createRoom',
        ({ roomName, userid, useridTo, restrictedLang }) => {
            const roomNumArr: Array<string> = [];
            (useridTo === 'monoChat'
                ? createMonoRoomDb(
                      roomName,
                      userid,
                      useridTo,
                      restrictedLang,
                      roomNumArr
                  )
                : createPersonalRoomDb(roomName, userid, useridTo, roomNumArr)
            ).then(() => {
                const inviteCode = generateInviteCode();
                chatRooms[roomNum] = {
                    id: roomNum,
                    name: roomName,
                    inviteCode,
                };

                socket.emit('roomCreated', {
                    roomNum,
                    roomName,
                    roomNumArr,
                });
                // userId 추가
                io.to(roomNum).emit('roomCreated', {
                    roomNum,
                    roomName,
                    roomNumArr,
                    userId: socket.id,
                });

                saveUserChatRoom(socket.id, roomNum); // 사용자의 채팅방 정보 저장

                console.log(
                    `User ${socket.id} created and joined room ${roomNum}`
                );
            });
        }
    );

    socket.on('joinRoomByInviteCode', (inviteCode) => {
        const room = findRoomByInviteCode(inviteCode);

        if (room) {
            socket.join(room.id);
            socket.emit('joinedRoom', room.id);
        } else {
            socket.emit('invalidInviteCode');
        }
    });
});

const generateInviteCode = () => {
    return Math.random().toString(36).substr(2, 8);
};

const findRoomByInviteCode = (inviteCode: string) => {
    return Object.values(chatRooms).find(
        (room) => room.inviteCode === inviteCode
    );
};

app.get('/api/chatRooms', (req: Request, res: Response) => {
    res.json(Object.values(chatRooms));
});

app.get('/api/chatRooms/:roomId', (req: Request, res: Response) => {
    const roomId = req.params.roomId;
    const room = chatRooms[roomId];

    if (room) {
        res.json(room);
    } else {
        res.status(404).json({ error: 'Room not found' });
    }
});

// 에러처리 핸들러, 요청, 응답의 제일 아래가야함.
app.use(handleErrors);
app.use(notFoundHandler);

const PORT = 4000;

db.sequelize
    .sync({ force: false })
    .then(() => {
        server.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        });
    })
    .catch((err: Error) => {
        console.log(err);
    });
