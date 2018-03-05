const express = require('express');
const app = express();
const PORT = process.env.port || 8080;
const http = require('http').Server(app);

const io = require('socket.io')(http);
const path = require('path');

var game = require('./public/game');

const targetImages = ["assets/watermelon.png", "assets/tomato.png"];

app.use(express.static(path.join(__dirname, 'public')));

http.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

io.on('connection', (socket) => {
  console.log(`${socket.id} has connected!`);

  if (Object.keys(game.players).length === 0) {
    game.shuffleTarget(targetImages[Math.floor(Math.random()*targetImages.length)]);
  }
  game.players[socket.id] = {
    x: 250,
    y: 250,
    points: 0
  };

  io.emit('gameUpdate', {target: game.target, players: game.players})

  socket.on('up', () => {
    game.players[socket.id].y -= 20;
    io.emit('gameUpdate', {target: game.target, players: game.players});
  });
  socket.on('down', () => {
    game.players[socket.id].y += 20;
    io.emit('gameUpdate', {target: game.target, players: game.players});
  });
  socket.on('right', () => {
    game.players[socket.id].x += 20;
    io.emit('gameUpdate', {target: game.target, players: game.players});
  });
  socket.on('left', () => {
    if(game.players[socket.id].x < 50){
      game.players[socket.id].x = 450;
    }
    game.players[socket.id].x -= 20;
    io.emit('gameUpdate', {target: game.target, players: game.players});
  });

  socket.on('disconnect', () => {
    delete game.players[socket.id];
  });
});