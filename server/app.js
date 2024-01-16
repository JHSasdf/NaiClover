const express = require('express');
const app = express();
const cors = require('cors');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());

let id = 2;
const todoList = [
  {
    id: 1,
    text: '할일1',
    done: false,
  },
];

app.get('/', function (req, res) {
  res.send('hello');
});

app.get('/api/todo', (req, res) => {
  res.json(todoList);
});

app.post('/api/todo', (req, res) => {
  const { text, done } = req.body;
  todoList.push({
    id: id++,
    text,
    done,
  });
  return res.send('succes');
});

app.listen(4000, () => {
  console.log('server open');
});
