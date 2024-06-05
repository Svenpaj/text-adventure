import { TextAdventureGame } from './textAdventureGame.js';

setupEventListeners();

function setupEventListeners(game) {
    document.getElementById('newGameButton').addEventListener('click', () => newGame());
    document.getElementById('saveGameButton').addEventListener('click', () => saveGameState(game));
    document.getElementById('loadGameButton').addEventListener('click', () => loadGameState());
}

document.addEventListener("DOMContentLoaded", function () {
    const audio = document.getElementById("audio");
    const volumeControl = document.getElementById("volumeControl");

    volumeControl.addEventListener("input", function () {
        audio.volume = volumeControl.value;
    });
});

function newGame() {
    const newGameButton = document.getElementById('newGameButton');
    const gameContainer = document.getElementById('gameContainer');
    gameContainer.style.display = 'block';
    newGameButton.style.display = 'none';
    const game = new TextAdventureGame();
    setupEventListeners(game);
}

function saveGameState(game) {

    const gameState = {
        currentRoom: game.currentRoom,
        playerStats: game.playerStats,
        inventory: game.inventory,
        rooms: game.rooms
    };

    fetch('/api/game/save', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ gameState }),
        credentials: 'include'
    })
        .then(response => response.json())
        .then(data => console.log('Game state saved', data))
        .catch(error => console.error('Error saving game state:', error));
}

function loadGameState() {

    fetch(`/api/game/load`, {
        method: 'GET',
        credentials: 'include'
    })
        .then(response => response.json())
        .then(data => {
            console.log('Game state loaded', data);
            if (data) {
                const state = {
                    currentRoom: data.state.gameState.currentRoom,
                    playerStats: data.state.gameState.playerStats,
                    inventory: data.state.gameState.inventory,
                    rooms: data.state.gameState.rooms
                }
                initializeGame(state);
            }

            // Update the UI as needed based on the loaded state
        })
        .catch(error => console.error('Error loading game state:', error));
}

function initializeGame(savedState) {
    // Initialize the game state, load the initial room, etc.
    const game = new TextAdventureGame(savedState);
    const gameContainer = document.getElementById('gameContainer');
    gameContainer.style.display = 'flex';
    setupEventListeners(game);
}
