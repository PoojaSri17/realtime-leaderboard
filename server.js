const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const connectDB = require('./mongoClient');
const leaderboard = require('./leaderboard');

const app = express();
const server = http.createServer(app);
const io = new Server(server);
const path = require("path");
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// Connect to MongoDB
connectDB();

io.on('connection', (socket) => {
  console.log('👤 A user connected');

  socket.on('updateScore', async ({ playerId, score, region, gameMode }) => {
    await leaderboard.updateScore(playerId, score, region, gameMode);
    const topPlayers = await leaderboard.getTopPlayers(region, gameMode, 10);
    io.emit('leaderboardUpdate', topPlayers);
  });

  socket.on('getTopPlayers', async ({ region, gameMode, limit }) => {
    const topPlayers = await leaderboard.getTopPlayers(region, gameMode, limit || 10);
    socket.emit('leaderboardUpdate', topPlayers);
  });

  socket.on('disconnect', () => {
    console.log('❌ User disconnected');
  });
});

server.listen(3000, () => {
  console.log('🚀 Server running at http://localhost:3000');
});
