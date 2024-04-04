import readline from 'readline';
import { rooms } from './rooms.js';
import { writeText } from './writeText.js';


/*This is changes that will be replacing existing ones when I switch over to frontend UI instead of a terminal
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

*/

class TextAdventureGame {
    constructor() {
        this.rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout,
        });
        this.playerStats = { health: 10, attack: 10, defense: 0, equippedArmor: null, equippedWeapon: null };
        this.currentRoom = 'start';
        this.inventory = [];
        this.startGame();
    }

    look(roomName = this.currentRoom) {
        writeText(`You are in the ${roomName}. And you can see exits to the ${Object.keys(rooms[roomName].exits).join(', ')}.`);
        if (rooms[roomName].detailedDescription) {
            writeText(rooms[roomName].detailedDescription);
        }
        if (rooms[roomName].items) {
            rooms[roomName].items.forEach(item => {
                writeText(`You spot a ${item.description}`);
            });
        }
        if (rooms[roomName].enemies) {
            rooms[roomName].enemies.forEach(enemy => {
                writeText(`You see a ${enemy.name}`);
            });
        }
    }

    inspect(itemName) {
        // Inspect function implementation
        if (rooms[this.currentRoom].items) {
            const itemIndex = rooms[this.currentRoom].items.findIndex(item => item.name.toLowerCase() === itemName.toLowerCase());
            if (itemIndex > -1) {
                writeText(rooms[this.currentRoom].items[itemIndex]);
            } else if (inventory.length > 0) {
                const inventoryItemIndex = inventory.findIndex(item => item.name.toLowerCase() === itemName.toLowerCase());
                if (inventoryItemIndex > -1) {
                    writeText(inventory[inventoryItemIndex].description);
                } else {
                    writeText(`You don't see nor have a ${itemName}.`);
                }
            }
        }
    }

    showRoomInfo(roomName) {
        // showRoomInfo function implementation
        writeText(rooms[roomName].description);
    }

    moveToRoom(direction) {
        // moveToRoom function implementation
        const room = rooms[this.currentRoom];
        let exit = room.exits[direction];

        // First check if the exit is guarded
        let isGuarded = false;
        if (exit && typeof exit === 'object' && exit.guarded) {
            room.enemies.forEach(enemy => {
                if (enemy.guarding) {
                    writeText(`The way to the ${direction} is guarded by by a ${enemy.name}.`);
                    isGuarded = true;
                    return; // Prevent moving through a guarded exit
                }
            });
        }

        // If exit is guarded, stop futher execution
        if (isGuarded) { return; }

        // If not guarded, then check if the exit is locked
        if (exit && typeof exit === 'object') {
            if (exit.locked) {
                writeText('The door is locked.');
                return; // Prevent moving through a locked door
            }
            exit = exit.roomId; // Proceed with the unlocked roomId
        } else if (!exit) {
            writeText(`There's no way to go ${direction} from here.`);
            return;
        }

        // Move to the new room if the exit isn't locked or is a direct roomId reference
        this.currentRoom = exit;
        this.showRoomInfo(this.currentRoom);
    }

    pickUpItem(itemName) {
        // pickUpItem function implementation
        const roomItems = rooms[this.currentRoom].items || [];
        const itemIndex = roomItems.findIndex(item => item.name.toLowerCase() === itemName.toLowerCase());
        if (itemIndex > -1) {
            const [item] = roomItems.splice(itemIndex, 1); // Remove item from room
            this.inventory.push(item); // Add to inventory
            writeText(`${item.name} added to inventory.`);
        } else {
            writeText(`There is no ${itemName} here.`);
        }
    }

    useItem(itemName) {
        const itemIndex = this.inventory.findIndex(item => item.name.toLowerCase() === itemName.toLowerCase());
        if (itemIndex === -1) {
            writeText(`You don't have a ${itemName}.`);
            return;
        }

        const item = this.inventory[itemIndex];
        const room = rooms[this.currentRoom];
        const interaction = room.interactions?.[itemName.toLowerCase()];

        if (interaction) {
            if (interaction.unlocks) {
                const exit = room.exits[interaction.unlocks];
                if (exit && typeof exit === 'object' && exit.locked) {
                    exit.locked = false; // Unlock the exit
                    writeText(interaction.message);
                    if (interaction.consume) {
                        this.inventory.splice(itemIndex, 1); // Optionally remove the item from inventory
                    }
                } else {
                    writeText('There is nothing to unlock here.');
                }
            }
            // Add more interaction types as needed
        } else {
            writeText(`You can't use the ${itemName} here.`);
        }
    }

    equipItem(itemName) {
        // equipItem function implementation
        const itemIndex = this.inventory.findIndex(item => item.name.toLowerCase() === itemName.toLowerCase() && item.type === 'armor' || item.type === 'weapon');
        if (itemIndex === -1) {
            writeText(`You don't have ${itemName} in your inventory.`);
            return;
        }

        const item = this.inventory[itemIndex];
        // Equip the item based on its type
        switch (item.type) {
            case 'armor':
                this.playerStats.defense += item.defense;
                this.playerStats.equippedArmor = item; // Store the equipped armor for reference
                writeText(`You equipped the ${item.name}. Defense is now ${this.playerStats.defense}.`);
                break;
            case 'weapon':
                this.playerStats.attack += item.attack;
                this.playerStats.equippedWeapon = item; // Store the equipped weapon for reference
                writeText(`You equipped the ${item.name}. Attack is now ${this.playerStats.attack}.`);
                break;
            default:
                writeText('This item cannot be equipped.');
                return;
        }

        // Mark the item as equipped
        item.equipped = true;
    }

    unequipItem(itemName) {
        // unequipItem function implementation
        const itemIndex = this.inventory.findIndex(item => item.name.toLowerCase() === itemName.toLowerCase() && item.type === 'armor' && item.equipped);
        if (itemIndex === -1) {
            writeText(`You don't have ${itemName} equipped.`);
            return;
        }

        const item = this.inventory[itemIndex];
        // Equip the item based on its type
        switch (item.type) {
            case 'armor':
                this.playerStats.defense -= item.defense;
                writeText(`You unequipped the ${item.name}. Defense is now ${this.playerStats.defense}.`);
                break;
            case 'weapon':
                this.playerStats.attack -= item.attack;
                writeText(`You unequipped the ${item.name}. Attack is now ${this.playerStats.attack}.`);
                break;
            default:
                writeText('This item cannot be unequipped.');
                return;
        }

        // Mark the item as unequipped
        item.equipped = false;
    }

    attackEnemy(enemyName) {
        const room = rooms[this.currentRoom];
        if (!room.enemies) {
            writeText('There are no enemies here.');
            return;
        }

        const enemyIndex = room.enemies.findIndex(enemy => enemy.name.toLowerCase() === enemyName.toLowerCase());
        if (enemyIndex === -1) {
            writeText(`There is no ${enemyName} here to attack.`);
            return;
        }

        const enemy = room.enemies[enemyIndex];
        // Simple combat calculation
        enemy.health -= this.playerStats.attack;
        writeText(`You attack the ${enemy.name} for ${this.playerStats.attack} damage. Its health is now ${enemy.health}.`);

        if (enemy.health <= 0) {
            writeText(`You defeated the ${enemy.name}!`);
            if (enemy.guarding) {
                for (const direction in room.exits) {
                    const exit = room.exits[direction];
                    if (exit && typeof exit === 'object' && exit.guarded) {
                        writeText(`The ${enemy.name} was guarding the way to the ${direction}.`);
                        exit.guarded = false; // Remove the guard
                    }
                }
                room.enemies.splice(enemyIndex, 1); // Remove the defeated enemy
            } else {
                // Enemy attacks back
                this.playerStats.health -= enemy.attack;
                writeText(`The ${enemy.name} attacks you back for ${enemy.attack} damage. Your health is now ${this.playerStats.health}.`);
                if (this.playerStats.health <= 0) {
                    writeText('You have been defeated. Game Over.');
                    this.rl.close(); // Assuming rl is a part of this class now
                }
            }
        }
    }

    waitForCommand() {
        // waitForCommand function implementation
        this.rl.question('What do you want to do? => ', (command) => {
            const [action, ...rest] = command.toLowerCase().split(' ');
            const target = rest.join(' ');

            switch (action) {
                case 'help': writeText('Commands: go [direction], take [item], use [item], equip [item], unequip [item], inventory, look, help'); break;
                case 'stats': writeText('Stats:', this.playerStats); break;
                case 'go': this.moveToRoom(target); break;
                case 'take': this.pickUpItem(target); break;
                case 'use': this.useItem(target); break;
                case 'equip': this.equipItem(target); break;
                case 'unequip': this.unequipItem(target); break;
                case 'inventory': writeText('Inventory:', this.inventory.map(item => item.name).join(', ')); break;
                case 'inspect': this.inspect(target); break; // Placeholder for inspect command
                case 'look': this.look(this.currentRoom); break;
                case 'attack': this.attackEnemy(target); break;
                default: writeText('Unknown command.'); break;
            }

            this.continueGame(); // Function to prompt for the next action or check game state
        });
    }

    continueGame() {
        // continueGame function implementation
        if (this.playerStats.health <= 0) {
            writeText('Game Over. You have been defeated.');
            this.rl.close();
        } else if (this.currentRoom === 'treasureRoom') {
            writeText('Game Over. You\'ve won!');
            this.rl.close();
        } else {
            this.waitForCommand(); // Wait for the next command
        }
    }

    startGame() {
        writeText('Welcome to the adventure game!');
        this.showRoomInfo(this.currentRoom);
        this.waitForCommand();
    }
}

// Creating an instance of the game
const game = new TextAdventureGame();
