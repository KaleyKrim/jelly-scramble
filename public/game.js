var players = {};
var target = {};

var canvasSize = 500;
var targetSize = 50;

function shuffleTarget(){
  var x = Math.floor(Math.random() * (Number(480 - 30) + 30));
  var y = Math.floor(Math.random() * (Number(480 - 30) + 30));

  target.x = x;
  target.y = y;
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