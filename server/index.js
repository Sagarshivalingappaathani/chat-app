const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const { createRoom, joinRoom, handleMessage } = require('./controllers/roomController');

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "https://chat-app-bolt.vercel.app",
    methods: ["GET", "POST"]
  }
});

io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  socket.on('createRoom', (roomName) => createRoom(socket, roomName));
  socket.on('joinRoom', (roomName) => joinRoom(socket, roomName));
  socket.on('sendMessage', (data) => handleMessage(io, socket, data));

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});