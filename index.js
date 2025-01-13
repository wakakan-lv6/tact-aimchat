const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const path = require("path");
const fs = require('fs');
const app = express();
const server = http.createServer(app);
const io = socketIO(server);
const a = require('socket.io-client')(process.env.url);
const chatdata = [];
app.set('trust proxy', true);
app.use(express.static('public'));
var ip = '';
app.get('/', (req, res) => {
  console.log(req.ip);//ほう
  //a.emit('ip', {'ip':req.ip});
  ip = req.ip;
  let banned = false
  if (ip == '221.114.66.24' || ip == '60.90.127.153' || ip == '202.182.123.67'){
    banned = true
  }
  if (req.ip == '122.20.71.235'){
    res.sendFile(__dirname + '/index2.html');
  }
  if (!(banned)){
    res.sendFile(__dirname + '/index.html');
  }
});
app.get('/getchat', (req, res) => {
  res.send(chatdata);
});
io.on('connection', (socket) => {
  console.log('connect');
  socket.on('send', (json) => {
    chatdata.push(json);
    if (chatdata.length > 200) {
      chatdata.shift();
    }
    io.emit('message', json);
  });
  socket.on('ip', (username) => {
    a.emit('ip', {'username':username, 'ip':socket.request.headers['x-forwarded-for'].substr(0, socket.request.headers['x-forwarded-for'].indexOf(',')) || socket.request.connection.remoteAddress});
  });
  socket.on('checking', (json) => {
    io.emit('check', json);
  });
  socket.on('livesend', (json) => {
    io.emit('livemessage', json);
  });
  socket.on('rel', (json) => {
    io.emit('reload', json);
  });
  socket.on('socket', (json) => {
    io.emit('socket', json);
  });
});

server.listen(8080, () => {
  console.log('Server is running on port 3000');
});