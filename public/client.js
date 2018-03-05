var socket = io.connect("localhost:8080");
var canvas = document.getElementById('game');
var ctx = canvas.getContext('2d');

function renderImg(xCoord, yCoord, source){

  var img = new Image();
  img.onload = function () {
    ctx.drawImage(img, xCoord, yCoord, 30, 30);
  }
  img.src = source;
}

function updateGame(data){

  renderImg(data.players[socket.id].x, data.players[socket.id].y, "assets/player.png");

  renderImg(data.target.x, data.target.y, "assets/watermelon.png");
}

socket.on('gameUpdate', function(data){
  updateGame(data);
});