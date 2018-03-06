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

  let freeCharacter = game.findFreeCharacter(game.characters);
  game.characters[freeCharacter] = true;
  console.log(game.characters);

  game.players[socket.id] = {
    x: 250,
    y: 250,
    points: 0,
    character: freeCharacter
  };

  io.emit('gameUpdate', {target: game.target, players: game.players});

  socket.on('up', () => {

    if(game.collisionCheck(game.players[socket.id], game.target)){
      game.players[socket.id].points += 1;
      game.shuffleTarget(targetImages[Math.floor(Math.random()*targetImages.length)]);
    }
    if(game.players[socket.id].y < 50){
      game.players[socket.id].y = 450;
    }
    game.players[socket.id].y -= 20;
    io.emit('gameUpdate', {target: game.target, players: game.players});
  });
  socket.on('down', () => {
   if(game.collisionCheck(game.players[socket.id], game.target)){
      game.players[socket.id].points += 1;
      game.shuffleTarget(targetImages[Math.floor(Math.random()*targetImages.length)]);
    }

    if(game.players[socket.id].y > 450){
      game.players[socket.id].y = 50;
    }
    game.players[socket.id].y += 20;
    io.emit('gameUpdate', {target: game.target, players: game.players});
  });
  socket.on('right', () => {
    if(game.collisionCheck(game.players[socket.id], game.target)){
      game.players[socket.id].points += 1;
      game.shuffleTarget(targetImages[Math.floor(Math.random()*targetImages.length)]);
    }

    if(game.players[socket.id].x > 450){
      game.players[socket.id].x = 50;
    }
    game.players[socket.id].x += 20;
    io.emit('gameUpdate', {target: game.target, players: game.players});
  });
  socket.on('left', () => {
    if(game.collisionCheck(game.players[socket.id], game.target)){
      game.players[socket.id].points += 1;
      game.shuffleTarget(targetImages[Math.floor(Math.random()*targetImages.length)]);
    }
    if(game.players[socket.id].x < 50){
      game.players[socket.id].x = 450;
    }
    game.players[socket.id].x -= 20;
    io.emit('gameUpdate', {target: game.target, players: game.players});
  });

  socket.on('disconnect', () => {
    let userChar = game.players[socket.id].character;
    game.characters[userChar] = false;
    delete game.players[socket.id];
  });
});