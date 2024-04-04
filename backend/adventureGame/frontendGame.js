class TextAdventureGame {
    constructor() {
        this.gameConsole = document.getElementById('gameConsole');
        this.commandInput = document.getElementById('commandInput');
        this.setupInputListener();
        this.writeText('Welcome to the adventure game!');
        // Initialize any other game state variables here
    }

    writeText(message) {
        this.gameConsole.innerHTML += `<p>${message}</p>`;
        this.gameConsole.scrollTop = this.gameConsole.scrollHeight;
    }

    setupInputListener() {
        this.commandInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && this.commandInput.value.trim() !== '') {
                this.processCommand(this.commandInput.value.trim());
                this.commandInput.value = '';
            }
        });
    }

    processCommand(command) {
        // Example command processing
        const [action, ...params] = command.split(' ');
        switch (action.toLowerCase()) {
            case 'go':
                this.moveToRoom(params.join(' '));
                break;
            case 'take':
                this.pickUpItem(params.join(' '));
                break;
            // Add more cases for other commands
            default:
                this.writeText('Unknown command.');
        }
    }

    // Game Logic Methods
    moveToRoom(direction) {
        // Your method implementation
    }

    pickUpItem(itemName) {
        // Your method implementation
    }

    // Add more game methods here...

}

window.onload = () => {
    const game = new TextAdventureGame();
};
