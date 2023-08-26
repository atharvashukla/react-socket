const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const cors = require("cors");

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:3000", // your frontend server origin
    methods: ["GET", "POST"],
  },
});

app.use(cors());

let count = 0;

setInterval(() => {
  count++;
  io.emit("countUpdated", count); // Emit the updated count to all connected clients
}, 1000);

io.on("connection", (socket) => {
  console.log("New client connected");
  socket.emit("countUpdated", count);

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

const PORT = 5001;

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
