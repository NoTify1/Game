// public/game.js
const socket = io();
let playerId = socket.id; // Player's unique ID
let playerScore = 0;
let level = 1;
let gameTime = 1000;

socket.on('roundStarted', (message) => {
    document.getElementById('gameStatus').textContent = message;
});

socket.on('gameOver', (message) => {
    alert(message);
    startRound();
});

socket.on('updateScore', (scores) => {
    const leaderboard = document.getElementById('leaderboard');
    leaderboard.innerHTML = '';
    for (const id in scores) {
        const listItem = document.createElement('li');
        listItem.textContent = `${id}: ${scores[id]}`;
        leaderboard.appendChild(listItem);
    }
});

function startRound() {
    socket.emit('startRound');
    // Random mini-game logic goes here
    playMiniGame();
}

function playMiniGame() {
    gameTime = 1000 - (level * 50); // Decrease time for higher levels

    setTimeout(() => {
        const correct = Math.random() > 0.5; // Random outcome (win or lose)
        if (correct) {
            alert('You succeeded!');
            level++;
            socket.emit('roundEnd');
        } else {
            socket.emit('playerFailed', playerId);
        }
    }, gameTime); // Decrease time as level increases
}

function checkAnswer() {
    socket.emit('playerFailed', playerId); // For testing
}
