import express, { Express, Request, Response } from 'express';
import cors from 'cors';

import http from 'http';
import { Server, Socket } from 'socket.io';

import { authRouter } from './routes/auth.routes';
import { db } from './model';

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
app.use(
  cors({
    credentials: true,
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PATCH', 'DELETE'],
  })
);

const connectedClients: Record<string, Socket> = {};

app.use(authRouter);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/App.tsx');
});

app.post('/something', (req, res) => {
  const data = req.cookies;
  const data2 = req.signedCookies;
  const readdata = req.body.data1;
  res.json({ data1: data, data2: data2, data4: readdata, data3: 'sfsf' });
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
