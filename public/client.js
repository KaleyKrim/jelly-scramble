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
      break
    case 'ArrowUp':
      socket.emit('up');
      break
    case 'ArrowLeft':
      socket.emit('left');
      break
    case 'ArrowRight':
      socket.emit('right');
      break
  }

}

function updateGame(state){
  players = state.players;
  target = state.target;
  renderImg(state.players[socket.id].x, state.players[socket.id].y, "assets/player.png");
  renderImg(state.target.x, state.target.y, "assets/watermelon.png");
}

socket.on('gameUpdate', function(data){
  updateGame(data);
});

// setInterval(updateGame({players: players, target: target}), 20);