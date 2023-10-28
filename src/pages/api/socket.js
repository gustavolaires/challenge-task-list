import { Server } from "socket.io"

export default function handlerTasks(req, res) {
  if (!res.socket.server.io) {
    {/* Starting Socket.IO in first use */}
    const io = new Server(res.socket.server);

    // Listen for connection events
    io.on('connection', (socket) => {
      
        // Listen for incoming messages and broadcast to all clients
        socket.on('update-tasks', (message) => {
            io.emit('sync-tasks', message);
        });
    });
    res.socket.server.io = io;
  }
  
  res.end()
}