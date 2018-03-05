var socket = io.connect("localhost:8080");
var canvas = document.getElementById('game');
var ctx = canvas.getContext('2d');

window.onload = renderPlayer();

function renderPlayer(){

  var img = new Image();
  img.onload = function () {
    ctx.drawImage(img, 75, 55, 30, 30);
  }
  img.src = "assets/player.png";

}

function updateGame(data){
  var target = new Image();
  target.onload = function(){
    ctx.drawImage(target, data.target.x, data.target.y, 30, 30);
  }
  console.log(data);
  target.src = "assets/watermelon.png";
}

socket.on('gameUpdate', function(data){
  updateGame(data);
});