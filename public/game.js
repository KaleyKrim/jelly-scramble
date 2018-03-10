var players = {};
var target = {};

var canvasSize = 500;
var targetSize = 50;
var playerSize = 50;

var characters = {
  "assets/player2.png":false,
  "assets/player3.png":false,
  "assets/player4.png":false,
  "assets/player.png":false,
  "assets/player5.png":false,
  "assets/player6.png":false,
  "assets/player7.png":false,
  "assets/player8.png":false
};

function findFreeCharacter(charObj){
  let freeChar;
  for (var key in charObj){
    if(charObj[key] === false){
      charObj[key] = true;
      return key;
    }
  }
}

function sizeUp(player){
  if(player.points === 10){
    player.size += 20;
  }else if(player.points === 30){
    player.size += 20;
  }else if(player.points === 50){
    player.size += 20;
  }else if(player.points === 60){
    player.size += 20;
  }
}

function goDown(player){
  player.y += player.speed;
}

function goUp(player){
  player.y -= player.speed;
}

function goLeft(player){
  player.x -= player.speed;
}

function goRight(player){
  player.x += player.speed;
}

function scorePoints(player, target){
  if(!target.special){
    player.points += target.points;
  }else{
    player.speed += target.special;
  }
}

function shuffleTarget(targetData){
  var x = Math.floor(Math.random() * (Number(460 - targetSize) + targetSize));
  var y = Math.floor(Math.random() * (Number(460 - targetSize) + targetSize));

  target.x = x;
  target.y = y;
  target.source = targetData.source;
  target.points = targetData.points;
  if(targetData.special){
    target.special = targetData.special;
  }else{
    target.special = null;
  }
  console.log(target);
}

function gameStateUpdates(game, socket, targets){
  if(game.collisionCheck(game.players[socket.id], game.target)){
    game.scorePoints(game.players[socket.id], game.target);
    game.sizeUp(game.players[socket.id]);
    game.shuffleTarget(targets[Math.floor(Math.random()*targets.length)]);
  }
}

function makeNewCharacter(freeCharacter){
  let newChar = {
    x: 250,
    y: 250,
    points: 0,
    size: 50,
    character: freeCharacter,
    speed: 20
  };

  return newChar;
}

function collisionCheck(player, target){
  return(Math.abs(player.x - target.x) <= player.size && Math.abs(player.y - target.y) <= player.size);
}

if(!this.navigator){
  module.exports = {
    players: players,
    characters: characters,
    target: target,
    targetSize: targetSize,
    canvasSize: canvasSize,
    shuffleTarget: shuffleTarget,
    sizeUp: sizeUp,
    goLeft: goLeft,
    goRight: goRight,
    goUp: goUp,
    goDown: goDown,
    scorePoints: scorePoints,
    findFreeCharacter: findFreeCharacter,
    collisionCheck: collisionCheck,
    gameStateUpdates: gameStateUpdates,
    makeNewCharacter: makeNewCharacter
  }
}