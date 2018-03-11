const express = require('express');
const app = express();
const PORT = process.env.port || 8080;
const http = require('http').Server(app);

const io = require('socket.io')(http);
const jelly = io
  .of('/jelly');

const path = require('path');

var game = require('./public/game');

const targets = [{source: "assets/watermelon.png", points: 2}, {source: "assets/tomato.png", points: 1}, {source: "assets/tomato2.png", points: 0, special: 2}, {source: "assets/tomato3.png", points: 1}];

app.use(express.static(path.join(__dirname, 'public')));

http.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});


jelly.on('connection', (socket) => {
  console.log(`${socket.id} has connected!`);

  if (Object.keys(game.players).length === 0) {
    game.shuffleTarget(targets[Math.floor(Math.random()*targets.length)]);
  }
  let freeCharacter = game.findFreeCharacter(game.characters);
  game.players[socket.id] = game.makeNewCharacter(freeCharacter);
  jelly.emit('gameUpdate', {target: game.target, players: game.players});

  socket.on('up', () => {
    game.gameStateUpdates(game, socket, targets);
    game.infiniteUp(game.players[socket.id]);
    game.goUp(game.players[socket.id]);
    jelly.emit('gameUpdate', {target: game.target, players: game.players});
  });

  socket.on('down', () => {
    game.gameStateUpdates(game, socket, targets);
    game.infiniteDown(game.players[socket.id]);
    game.goDown(game.players[socket.id]);
    jelly.emit('gameUpdate', {target: game.target, players: game.players});
  });

  socket.on('right', () => {
    game.gameStateUpdates(game, socket, targets);
    game.infiniteRight(game.players[socket.id]);
    game.goRight(game.players[socket.id]);
    jelly.emit('gameUpdate', {target: game.target, players: game.players});
  });

  socket.on('left', () => {
    game.gameStateUpdates(game, socket, targets);
    game.infiniteLeft(game.players[socket.id]);
    game.goLeft(game.players[socket.id]);
    jelly.emit('gameUpdate', {target: game.target, players: game.players});
  });

  socket.on('disconnect', () => {
    let userChar = game.players[socket.id].character;
    game.characters[userChar] = false;
    delete game.players[socket.id];
    jelly.emit('gameUpdate', {target: game.target, players: game.players});
  });
});