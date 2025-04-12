// server/server.js
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

let playerScores = {};

app.use(express.static('public')); // Serve static files (frontend)

io.on('connection', (socket) => {
    console.log('a user connected');
    playerScores[socket.id] = 0; // Start player score at 0

    socket.on('disconnect', () => {
        console.log('user disconnected');
        delete playerScores[socket.id];
    });

    // Multiplayer round start
    socket.on('startRound', () => {
        io.emit('roundStarted', 'New round started! Players ready!');
    });

    // Player failed in mini-game
    socket.on('playerFailed', (playerId) => {
        playerScores[playerId] += 1; // Increase score for the player who succeeded
        io.emit('updateScore', playerScores); // Update all players' scores
        socket.emit('gameOver', 'You lost! Try again.');
    });

    // Send updated scores after round
    socket.on('roundEnd', () => {
        io.emit('updateScore', playerScores);
    });

    // Leaderboard update
    socket.on('getLeaderboard', () => {
        socket.emit('leaderboard', playerScores);
    });
});

server.listen(3000, () => {
    console.log('listening on *:3000');
});
