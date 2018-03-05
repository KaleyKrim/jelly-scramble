var players = {};
var target = {};

var canvasSize = 500;
var targetSize = 50;

function shuffleTarget(imgPath){
  var x = Math.floor(Math.random() * (Number(480 - 50) + 50));
  var y = Math.floor(Math.random() * (Number(480 - 50) + 50));

  target.x = x;
  target.y = y;
  target.source = imgPath;
}

if(!this.navigator){
  module.exports = {
    players: players,
    target: target,
    targetSize: targetSize,
    canvasSize: canvasSize,
    shuffleTarget: shuffleTarget
  }
}