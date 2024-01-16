'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
var express = require('express');
var app = express();
var cors = require('cors');
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
var id = 2;
var todoList = [
  {
    id: 1,
    text: '할일1',
    done: false,
  },
];
app.get('/', function (req, res) {
  res.send('hello');
});
app.get('/api/todo', function (req, res) {
  res.json(todoList);
});
app.post('/api/todo', function (req, res) {
  var _a = req.body,
    text = _a.text,
    done = _a.done;
  todoList.push({
    id: id++,
    text: text,
    done: done,
  });
  return res.send('succes');
});
app.listen(4000, function () {
  console.log('server open');
});
