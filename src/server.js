const express = require("express");
const app = express();
require("dotenv").config();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
io.on("connection", (socket) => {
  console.log("User connected", socket.id);
  socket.on("disconnect", () => {
    console.log("User disconnected", socket.id);
  });
  socket.on("chat message", (payload) => {
    console.log("Received client event", payload, socket.id);
    // Speak
    io.emit("server Event", payload);
  });
});
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});
const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
