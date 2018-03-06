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

function shuffleTarget(imgPath){
  var x = Math.floor(Math.random() * (Number(480 - 50) + 50));
  var y = Math.floor(Math.random() * (Number(480 - 50) + 50));

  target.x = x;
  target.y = y;
  target.source = imgPath;
}

function collisionCheck(player, target){
  return(Math.abs(player.x - target.x) <= playerSize && Math.abs(player.y - target.y) <= playerSize)
}

if(!this.navigator){
  module.exports = {
    players: players,
    characters: characters,
    target: target,
    targetSize: targetSize,
    canvasSize: canvasSize,
    shuffleTarget: shuffleTarget,
    findFreeCharacter: findFreeCharacter,
    collisionCheck: collisionCheck
  }
}