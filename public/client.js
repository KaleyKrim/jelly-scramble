var socket = io();
var canvas = document.getElementById('game');
var ctx = canvas.getContext('2d');

window.onload = renderPlayer();

function renderPlayer(){

  var img = new Image();
  img.onload = function () {
    ctx.drawImage(img, 75, 55, 20, 20);
  }
img.src = "assets/player.png";
}