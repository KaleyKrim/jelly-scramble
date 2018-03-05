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

document.addEventListener('keydown', move);

function move(e){
  switch(e.key){
    case 'ArrowDown':
      socket.emit('down');

  }

}

function updateGame(playerData, targetData){
  players = playerData;
  target = targetData;
  renderImg(playerData[socket.id].x, playerData[socket.id].y, "assets/player.png");
  renderImg(targetData.x, targetData.y, "assets/watermelon.png");
}

socket.on('gameUpdate', function(data){
  updateGame(data.players, data.target);
});

setInterval(updateGame(players, target), 20);