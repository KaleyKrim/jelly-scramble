const express = require('express');
const app = express();
const PORT = process.env.port || 8080;
const http = require('http').Server(app);

const io = require('socket.io')(http);
const path = require('path');

var game = require('./public/game');

app.use(express.static(path.join(__dirname, 'public')));

http.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

io.on('connection', (socket) => {
  console.log(`${socket.id} has connected!`);

  game.shuffleTarget();

  io.emit('gameUpdate', {target: game.target})
});