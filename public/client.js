var socket = io.connect("localhost:8080");
var canvas = document.getElementById('game');
var ctx = canvas.getContext('2d');

function renderImg(xCoord, yCoord, source){

  var img = new Image();
  img.onload = function () {
    ctx.drawImage(img, xCoord, yCoord, 50, 50);
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

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  players = state.players;
  target = state.target;
  let playerArray = Object.keys(state.players).map((key) => {
    return [key, state.players[key]]
  });
  playerArray.forEach((player) => {
    if(player[0] != socket.id){
      renderImg(player[1].x, player[1].y, player[1].character);
    }
  });

  renderImg(state.players[socket.id].x, state.players[socket.id].y, state.players[socket.id].character);
  renderImg(state.target.x, state.target.y, state.target.source);
}

socket.on('gameUpdate', function(data){
  updateGame(data);
});

// setInterval(updateGame({players: players, target: target}), 20);