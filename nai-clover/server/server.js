'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
var express = require('express');
var path = require('path');
var app = express();
var PORT = 8080;
app.use(express.static(__dirname + '/../build'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, '/../build/index.html'));
});
app.listen(PORT, function () {
  console.log('server is running at port'.concat(PORT));
});
