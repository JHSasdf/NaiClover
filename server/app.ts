import express from 'express';
import { Express, Request, Response } from 'express';
const app: Express = express();
import cors from 'cors';
const db = require('./model/index');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cors());

let id = 2;
const todoList = [
    {
        id: 1,
        text: '할일1',
        done: false,
    },
];

app.get('/', function (req: Request, res: Response) {
    res.send('hello');
});

app.get('/api/todo', (req: Request, res: Response) => {
    res.json(todoList);
});

app.post('/api/todo', (req: Request, res: Response) => {
    const { text, done } = req.body;
    todoList.push({
        id: id++,
        text,
        done,
    });
    return res.send('succes');
});

db.sequelize
    .sync({ force: false })
    .then(() => {
        app.listen(4000, () => {
            console.log('server open');
        });
    })
    .catch((err: Error) => {
        console.log(err);
    });
