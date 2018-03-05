var players = {};
var target = {};

var canvasSize = 500;
var targetSize = 50;

function shuffleTarget(){
  var x = Math.floor(Math.random() * Number(canvasSize) - 100) + 10;
  var y = Math.floor(Math.random() * Number(canvasSize) - 100) + 10;

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