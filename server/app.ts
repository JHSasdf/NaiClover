import express, { Express, Request, Response } from 'express';
import cors from 'cors';

import http from 'http';
import { Server, Socket } from 'socket.io';

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

const connectedClients: Record<string, Socket> = {};

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/App.tsx');
});

io.on('connection', (socket: Socket) => {
  console.log('a user connected');

  // 클라이언트 소켓 저장
  connectedClients[socket.id] = socket;

  // 클라이언트로부터 받은 메시지를 모든 클라이언트에게 전송
  socket.on('chat message', (msg: string) => {
    io.emit('chat message', { id: socket.id, message: msg });
  });

  // 클라이언트가 연결을 끊을 때
  socket.on('disconnect', () => {
    console.log('user disconnected');
    // 연결이 끊긴 클라이언트 소켓 삭제
    delete connectedClients[socket.id];
  });
});

app.get('/', function (req: Request, res: Response) {
  res.send('hello');
});

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
