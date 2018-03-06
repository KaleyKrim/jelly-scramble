var players = {};
var target = {};

var canvasSize = 500;
var targetSize = 50;
var playerSize = 50;

var characters = {
  "assets/player.png":false,
  "assets/player2.png":false,
  "assets/player3.png":false,
  "assets/player4.png":false,
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
  }
}

function goDown(player){
  player.y += 20;
}

function goUp(player){
  player.y -= 20;
}

function goLeft(player){
  player.x -= 20;
}

function goRight(player){
  player.x += 20;
}

function scorePoints(player, target){
  player.points += target.points;
}

function shuffleTarget(targetData){
  var x = Math.floor(Math.random() * (Number(480 - targetSize) + targetSize));
  var y = Math.floor(Math.random() * (Number(480 - targetSize) + targetSize));

  target.x = x;
  target.y = y;
  target.source = Object.keys(targetData)[0];
  target.points = targetData[target.source];
  console.log(target);
}

function collisionCheck(player, target){
  return(Math.abs(player.x - target.x) <= player.size && Math.abs(player.y - target.y) <= player.size)
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
    collisionCheck: collisionCheck
  }
}