require('dotenv').config();

const server = require('http').createServer();
const io = require('socket.io')(server, {
  path: '/',
});

io.on('connection', (socket) => {
  console.log('A client connected');

  socket.on('questions:add', (question) => {
    socket.broadcast.emit('questions:add', question);
  });

  socket.on('questions:update', (question) => {
    socket.broadcast.emit('questions:update', question);
  });

  socket.on('questions:remove', (question) => {
    socket.broadcast.emit('questions:remove', question);
  });

  socket.on('disconnect', () => {
    console.log('A client disconnected');
  });
});

server.listen(process.env.PORT);
console.log('Socket is listening on port ', process.env.PORT);
