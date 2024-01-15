'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
var express = require('express');
var path = require('path');
var app = express();
var PORT = 8080;
app.use(express.static(__dirname + '/../build'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// 아래 구문은 react에서 라우팅을 담당하게 하는 구문. post 등의 라우터는 위에 설정하면 될듯.
// 에러처리는 리액트에서 해야하나??? 어떻게하지
app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, '/../build/index.html'));
});
app.listen(PORT, function () {
  console.log('server is running at port'.concat(PORT));
});
