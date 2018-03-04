const express = require('express');
const app = express();
const PORT = process.env.port || 8080;
const http = require('http').Server(app);

const io = require('socket.io')(http);

const path = require('path');

app.use(express.static(path.join(__dirname, 'public')));

http.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});