const express = require('express');
const app = express();
const PORT = process.env.port || 8080;
const http = require('http').Server(app);

const io = require('socket.io')(http);
const path = require('path');

var game = require('./public/game');

const targets = [{"assets/watermelon.png": 1}, {"assets/tomato.png": 1}];

app.use(express.static(path.join(__dirname, 'public')));

http.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});


io.on('connection', (socket) => {
  console.log(`${socket.id} has connected!`);

  if (Object.keys(game.players).length === 0) {
    game.shuffleTarget(targets[Math.floor(Math.random()*targets.length)]);
  }
  let freeCharacter = game.findFreeCharacter(game.characters);
  game.players[socket.id] = game.makeNewCharacter(freeCharacter);
  io.emit('gameUpdate', {target: game.target, players: game.players});

  socket.on('up', () => {

    game.gameStateUpdates(game, socket, targets);

    if(game.players[socket.id].y < 50){
      game.players[socket.id].y = 450;
    }

    game.goUp(game.players[socket.id]);

    io.emit('gameUpdate', {target: game.target, players: game.players});
  });

  socket.on('down', () => {
   game.gameStateUpdates(game, socket, targets);

    if(game.players[socket.id].y > 450){
      game.players[socket.id].y = 50;
    }

    game.goDown(game.players[socket.id]);

    io.emit('gameUpdate', {target: game.target, players: game.players});
  });

  socket.on('right', () => {
    game.gameStateUpdates(game, socket, targets);

    if(game.players[socket.id].x > 450){
      game.players[socket.id].x = 50;
    }

    game.goRight(game.players[socket.id]);

    io.emit('gameUpdate', {target: game.target, players: game.players});
  });

  socket.on('left', () => {
    game.gameStateUpdates(game, socket, targets);

    if(game.players[socket.id].x < 50){
      game.players[socket.id].x = 450;
    }

    game.goLeft(game.players[socket.id]);

    io.emit('gameUpdate', {target: game.target, players: game.players});
  });

  socket.on('disconnect', () => {
    let userChar = game.players[socket.id].character;
    game.characters[userChar] = false;
    delete game.players[socket.id];
    io.emit('gameUpdate', {target: game.target, players: game.players});
  });
});