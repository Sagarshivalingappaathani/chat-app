const rooms = new Map();

exports.createRoom = (socket, roomName) => {
  if (!rooms.has(roomName)) {
    rooms.set(roomName, []);
    console.log(`Room created: ${roomName}`);
  }
  socket.emit('roomCreated', roomName);
};

exports.joinRoom = (socket, roomName) => {
  if (rooms.has(roomName)) {
    socket.join(roomName);
    socket.emit('roomJoined', {
      room: roomName,
      messages: rooms.get(roomName)
    });
    console.log(`User ${socket.id} joined room: ${roomName}`);
  } else {
    socket.emit('error', 'Room does not exist');
  }
};

exports.handleMessage = (io, socket, { room, message, sender }) => {
  if (rooms.has(room)) {
    const messageObj = {
      id: Date.now(),
      text: message,
      sender,
      timestamp: new Date().toISOString()
    };
    rooms.get(room).push(messageObj);
    io.to(room).emit('newMessage', messageObj);
  }
};