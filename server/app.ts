declare module 'express-session' {
    interface SessionData {
        userid: String;
    }
}
import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import session from 'express-session';
import http from 'http';
import { Server, Socket } from 'socket.io';
import { authRouter } from './routes/auth.routes';
import { myPageRouter } from './routes/mypage.routes';
import { followRouter } from './routes/follow.routes';
import { postsRouter } from './routes/post.routes';
import { langPostsRouter } from './routes/langPost.routes';

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

app.use(session(getSessionConfig()));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
    cors({
        credentials: true,
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST', 'patch', 'delete'],
    })
);

const connectedClients: Record<string, Socket> = {};

app.use(authRouter);
app.use(myPageRouter);
app.use(followRouter);
app.use(postsRouter);
app.use(langPostsRouter);

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/App.tsx');
});

const chatRooms: Record<
    string,
    { id: string; name: string; inviteCode: string }
> = {};

io.on('connection', (socket: Socket) => {
    socket.on('joinRoom', (room) => {
        socket.join(room);
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
            io.to(msg.room).emit('chat message', {
                ...msg,
                text: serverMessage,
                isSentByMe,
                userId: msg.userId, // 클라이언트에서 전달받은 userId 사용
            });

            console.log(serverMessage);
            console.log(msg.userId); // userId 출력
        }
    });

    socket.on('disconnect', () => {
        console.log('user disconnected');
        delete connectedClients[socket.id];
    });

    const generateUniqueId = () => {
        return Math.random().toString(36).substr(2, 9);
    };

    socket.on('createRoom', ({ roomName }) => {
        const roomId = generateUniqueId();
        const inviteCode = generateInviteCode();
        chatRooms[roomId] = { id: roomId, name: roomName, inviteCode };

        socket.emit('roomCreated', { roomId, roomName });
        // userId 추가
        io.to(roomId).emit('roomCreated', {
            roomId,
            roomName,
            userId: socket.id,
        });
    });

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
