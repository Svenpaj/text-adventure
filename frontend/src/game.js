import { TextAdventureGame } from './textAdventureGame.js';

window.onload = () => {
    const game = new TextAdventureGame();
    // You can now use 'game' for UI interactions, saving, and loading
    setupEventListeners(game);
};

function setupEventListeners(game) {
    // Assuming you have buttons in your HTML for saving/loading
    document.getElementById('saveGameButton').addEventListener('click', () => saveGameState(game));
    document.getElementById('loadGameButton').addEventListener('click', () => loadGameState());
}

function saveGameState(game) {

    const gameState = {
        currentRoom: game.currentRoom,
        playerStats: game.playerStats,
        inventory: game.inventory
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
                initializeGame(data.state);
            }
            //game.currentRoom = data.state.currentRoom;
            //game.playerStats = data.state.playerStats;
            //game.inventory = data.state.inventory;
            // Update the UI as needed based on the loaded state
        })
        .catch(error => console.error('Error loading game state:', error));
}

function initializeGame(savedState) {
    // Initialize the game state, load the initial room, etc.
    const game = new TextAdventureGame();
    game.currentRoom = savedState.currentRoom;
    game.playerStats = savedState.playerStats;
    game.inventory = savedState.inventory;
}
