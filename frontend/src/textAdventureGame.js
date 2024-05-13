import { rooms } from './rooms.js';
import { writeText } from './writeText.js';

function wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

class TextAdventureGame {
    constructor(initialState) {
        // Make a particular copy of all room data for this game
        // if we want to inject new propterties in a room
        // it will now only for this copy
        this.rooms = JSON.parse(JSON.stringify(rooms));
        // Initialize the game state
        this.gameConsole = document.getElementById('gameConsole');
        this.commandInput = document.getElementById('commandInput');
        this.gameCommands = document.getElementById('gameCommands');
        this.setupInputListener();
        if (initialState) {
            console.log('initialState:', initialState)
            this.currentRoom = initialState.currentRoom;
            this.playerStats = initialState.playerStats;
            this.inventory = initialState.inventory || [];
            this.rooms = initialState.rooms;

            console.log('this.currentRoom:', this.currentRoom)
            console.log('this.playerStats:', this.playerStats)
            // problem with inventory being empty, but the data is there...?
            console.log('this.inventory:', this.inventory)
        }
        else {
            // Initialize any other game state variables here
            this.playerStats = { level: 1, experience: 0, neededExp: 100, health: 20, attack: 5, defense: 0, agility: 2, equippedArmor: null, equippedWeapon: null };
            this.currentRoom = 'start';
            this.inventory = [];
        }
        this.startGame();
    }

    updateRoomBackground() {
        const room = this.rooms[this.currentRoom];
        const imagePath = room.image ? `./images/${room.image}` : 'none';

        const roomImageContainer = document.getElementById('roomImageContainer');
        roomImageContainer.innerHTML = `<img id="roomBG" src="${imagePath}" style="margin: auto;" alt="${room.name}">`;

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
        const [action, ...params] = command.split(' ');
        const target = params.join(' ');
        switch (action.toLowerCase()) {
            case 'help':
                writeText('Commands: go [direction], take [item], use [item], equip [item], unequip [item], inventory, look, help');
                break;
            case 'stats':
                const statsText = `Stats: Level: ${this.playerStats.level}, Current EXP: ${this.playerStats.experience}, Next level: ${this.playerStats.neededExp} Health: ${this.playerStats.health}, Attack: ${this.playerStats.attack}, Defense: ${this.playerStats.defense}, Agility: ${this.playerStats.agility}, Armor: ${this.playerStats.equippedArmor ? this.playerStats.equippedArmor.name : 'None'}, Weapon: ${this.playerStats.equippedWeapon ? this.playerStats.equippedWeapon.name : 'None'}`;
                writeText(statsText);
                break;
            case 'go':
                this.moveToRoom(target);
                break;
            case 'take':
                this.pickUpItem(target);
                break;
            case 'loot':
                this.lootEnemy(target);
                break;
            case 'use':
                this.useItem(target);
                break;
            case 'equip':
                this.equipItem(target);
                break;
            case 'unequip':
                this.unequipItem(target);
                break;
            case 'inventory':
                const inventoryText = `Inventory: ${this.inventory.map(item => item.name).join(', ')}`;
                writeText(inventoryText);
                break;
            case 'inspect':
                this.inspect(target);
                break;
            case 'look':
                this.look(); // At this moment `look` method defaults to looking in the current room
                break;
            case 'attack':
                this.attackEnemy(target);
                break;
            default:
                writeText('Unknown command.');
                break;
        }
        // Optionally, invoke a method to check game state or continue the game loop here.
        this.continueGame(); // Function to prompt for the next action or check game state
    }

    levelUp() {
        this.playerStats.experience -= this.playerStats.neededExp;
        this.playerStats.level += 1;
        this.playerStats.neededExp *= 2;
        this.playerStats.health += this.playerStats.health * 0.3;
        this.playerStats.attack += this.playerStats.attack * 0.3;
        this.playerStats.defense += this.playerStats.defense * 0.3;
        this.playerStats.agility += this.playerStats.agility * 0.3;
        writeText(`You've leveled up to level ${this.playerStats.level}!`);
    }

    // Game Logic Methods
    look(roomName = this.currentRoom) {
        writeText(`You are in the ${roomName}. And you can see exits to the ${Object.keys(this.rooms[roomName].exits).join(', ')}.`);
        if (this.rooms[roomName].detailedDescription) {
            writeText(this.rooms[roomName].detailedDescription);
        }
        if (this.rooms[roomName].items) {
            this.rooms[roomName].items.forEach(item => {
                writeText(`You spot a ${item.description}`);
            });
            const imagePath = this.rooms[roomName].imageItems ? `./images/${this.rooms[roomName].imageItems}` : 'none';
            const roomImageContainer = document.getElementById('roomImageContainer');
            roomImageContainer.innerHTML = `<img id="roomBG" src="${imagePath}" style="margin: auto;" alt="${this.rooms[roomName].name}">`;
        }
        if (this.rooms[roomName].enemies) {
            this.rooms[roomName].enemies.forEach(enemy => {
                if (enemy.alive) {
                    writeText(`You see a ${enemy.name} here.`);
                }
                else {
                    writeText(`You see a defeated ${enemy.name} here.`);
                }
            });
        }
    }

    inspect(itemName) {
        const normalizedItemName = itemName.toLowerCase();
        // First check the room's items
        if (this.inspectRoomItems(normalizedItemName)) {
            return;
        }
        // Then check the player's inventory
        if (this.inspectInventoryItems(normalizedItemName)) {
            return;
        }
        // Lastly, check the room's enemies
        this.inspectRoomEnemies(normalizedItemName);
    }

    inspectRoomItems(itemName) {
        const roomItems = this.rooms[this.currentRoom].items;
        if (!roomItems) return false;

        const item = roomItems.find(item => item.name.toLowerCase() === itemName);
        if (item) {
            writeText(item.description);
            return true;
        }
        return false;
    }

    inspectInventoryItems(itemName) {
        const item = this.inventory.find(item => item.name.toLowerCase() === itemName);
        if (item) {
            this.displayItemWithImage(item);
            writeText(item.description);
            if (item.type === 'weapon' || item.type === 'armor') {
                writeText(`Attack: ${item.attack || 0}, Defense: ${item.defense || 0}`);
            }
            return true;
        }
        return false;
    }

    inspectRoomEnemies(itemName) {
        const enemies = this.rooms[this.currentRoom].enemies;
        if (!enemies) return;

        const enemy = enemies.find(enemy => enemy.name.toLowerCase() === itemName);
        if (enemy) {
            writeText(enemy.description);
            writeText(`Health: ${enemy.health}, Attack: ${enemy.attack}`);
        } else {
            writeText(`You don't see a ${itemName} here.`);
        }
    }

    displayItemWithImage(item) {
        if (item.image) {
            const roomImageContainer = document.getElementById('roomImageContainer');
            roomImageContainer.innerHTML = `<img id="roomBG" src="./images/${item.image}" alt="${item.name}" style="width: 100%;">`;
        }
    }

    showRoomInfo(roomName) {
        // showRoomInfo function implementation
        writeText(this.rooms[roomName].description);
        this.updateRoomBackground();
    }

    async moveToRoom(direction) {
        // moveToRoom function implementation
        writeText(`You move ${direction}...`);
        await wait(1000); // Wait for 1 second per (1000ms) before moving to the new room
        const room = this.rooms[this.currentRoom];
        let exit = room.exits[direction];

        // First check if the exit is guarded
        if (exit && typeof exit === 'object') {
            if (exit.guardedBy.length > 0) {
                writeText(`The way to the ${direction} is guarded by a ${exit.guardedBy.join(' and ')}.`);
                return; // Prevent moving through a guarded exit
            }
        }

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
        const roomItems = this.rooms[this.currentRoom].items || [];
        const itemIndex = roomItems.findIndex(item => item.name.toLowerCase() === itemName.toLowerCase());
        if (itemIndex > -1) {
            const [item] = roomItems.splice(itemIndex, 1); // Remove item from room
            this.inventory.push(item); // Add to inventory
            writeText(`${item.name} added to inventory.`);
        } else {
            writeText(`There is no ${itemName} here.`);
        }
    }

    lootEnemy(enemy) {
        const room = this.rooms[this.currentRoom];
        const enemyIndex = room.enemies.findIndex(e => e.name.toLowerCase() === enemy.toLowerCase());
        if (enemyIndex === -1) {
            writeText(`There is no ${enemy} here to loot.`);
            return;
        }
        enemy = room.enemies[enemyIndex];
        if (!enemy.alive && enemy.loot && enemy.loot.length > 0) {
            enemy.loot.forEach(item => {
                this.inventory.push(item);  // Add loot to player's inventory
                writeText(`You found a ${item.name} on the ${enemy.name}'s corpse.`);
            });
        }
        else if (enemy.alive) {
            writeText(`Are you mad!? You can't loot a living ${enemy.name}.`);
        }

        else {
            writeText(`${enemy.name} had nothing to loot.`);
        }
    }

    useItem(itemName) {
        const itemIndex = this.inventory.findIndex(item => item.name.toLowerCase() === itemName.toLowerCase());
        if (itemIndex === -1) {
            writeText(`You don't have a ${itemName}.`);
            return;
        }

        // const item = this.inventory[itemIndex]; // I might take away this line

        const room = this.rooms[this.currentRoom];
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
        // Make sure the logical grouping is correct to properly filter items by type.
        const itemIndex = this.inventory.findIndex(item =>
            item.name.toLowerCase() === itemName.toLowerCase() && (item.type === 'armor' || item.type === 'weapon')
        );

        if (itemIndex === -1) {
            writeText(`You don't have ${itemName} in your inventory.`);
            return;
        }

        const item = this.inventory[itemIndex];
        if (item.equipped) {
            writeText(`You already have ${item.name} equipped.`);
            return;
        }

        // Equip the item based on its type
        switch (item.type) {
            case 'armor':
                if (this.playerStats.equippedArmor) {
                    writeText(`You already have armor equipped. Unequip it first.`);
                    return;
                }
                const defense = this.playerStats.defense + item.defense;
                this.playerStats.equippedArmor = item; // Store the equipped armor for reference
                writeText(`You equipped the ${item.name}. Your total defense is now ${defense}.`);
                break;
            case 'weapon':
                if (this.playerStats.equippedWeapon) {
                    writeText(`You already have a weapon equipped. Unequip it first.`);
                    return;
                }
                const attack = this.playerStats.attack + item.attack;
                this.playerStats.equippedWeapon = item; // Store the equipped weapon for reference
                writeText(`You equipped the ${item.name}. Your total attack is now ${attack}.`);
                break;
            default:
                writeText('This item cannot be equipped.');
                return;
        }

        // Mark the item as equipped
        item.equipped = true;
    }


    unequipItem(itemName) {
        // Search for the item regardless of its type but ensure it is equipped.
        const itemIndex = this.inventory.findIndex(item =>
            item.name.toLowerCase() === itemName.toLowerCase() && item.equipped
        );

        if (itemIndex === -1) {
            writeText(`You don't have ${itemName} equipped.`);
            return;
        }

        const item = this.inventory[itemIndex];
        switch (item.type) {
            case 'armor':
                this.playerStats.defense -= item.defense;
                this.playerStats.equippedArmor = null; // Clear the reference
                writeText(`You unequipped the ${item.name}. Defense is now ${this.playerStats.defense}.`);
                break;
            case 'weapon':
                this.playerStats.attack -= item.attack;
                this.playerStats.equippedWeapon = null; // Clear the reference
                writeText(`You unequipped the ${item.name}. Attack is now ${this.playerStats.attack}.`);
                break;
            default:
                writeText('This item cannot be unequipped.');
                return;
        }

        // Mark the item as unequipped
        item.equipped = false;
    }

    rollDice() {
        return Math.floor(Math.random() * 20) + 1;
    }

    attackEnemy(enemyName) {
        const room = this.rooms[this.currentRoom];
        if (!room.enemies) {
            writeText('There are no enemies here.');
            return;
        }

        const enemyIndex = room.enemies.findIndex(enemy => enemy.name.toLowerCase() === enemyName.toLowerCase());
        if (enemyIndex === -1) {
            writeText(`There is no ${enemyName} here to attack.`);
            return;
        }

        this.resolveAttack(room.enemies[enemyIndex], room, enemyIndex);
    }

    resolveAttack(enemy, room, enemyIndex) {
        const diceRoll = this.rollDice() + this.playerStats.agility; // Add player's agility to the dice roll

        if (diceRoll >= 17) {
            this.attackWithCriticalHit(enemy, room, enemyIndex);
        } else if (diceRoll >= 7 && diceRoll < 17) {
            this.attackEnemyWithNormalHit(enemy, room, enemyIndex);
        } else {
            this.missedAttack(enemy, room, enemyIndex);
        }
    }

    attackWithCriticalHit(enemy, room, enemyIndex) {
        const damage = ((this.playerStats.attack + (this.playerStats.equippedWeapon ? this.playerStats.equippedWeapon.attack : 0)) * 2) - enemy.defense;
        enemy.health -= damage;
        writeText(`Critical Hit! You attack the ${enemy.name} for ${damage} damage. Its health is now ${enemy.health}.`);
        this.handleEnemyHealth(enemy, room, enemyIndex);
    }

    attackEnemyWithNormalHit(enemy, room, enemyIndex) {
        const damage = (this.playerStats.attack + (this.playerStats.equippedWeapon ? this.playerStats.equippedWeapon.attack : 0)) - enemy.defense;
        enemy.health -= damage;
        writeText(`You attack the ${enemy.name} for ${damage} damage. Its health is now ${enemy.health}.`);
        this.handleEnemyHealth(enemy, room, enemyIndex);
    }

    missedAttack(enemy) {
        writeText(`You missed the ${enemy.name}!`);
        this.enemyAttacksBack(enemy);
    }

    handleEnemyHealth(enemy, room, enemyIndex) {
        if (enemy.health <= 0) {
            writeText(`You defeated the ${enemy.name}!`);
            this.playerStats.experience += enemy.experience;
            writeText(`You gained ${enemy.experience} experience.`);
            if (this.playerStats.experience >= this.playerStats.neededExp) {
                this.levelUp();
            }
            writeText(`Your current experience is ${this.playerStats.experience}.`);
            room.enemies[enemyIndex].alive = false; // Mark the enemy as defeated
            // room.enemies.splice(enemyIndex, 1); // Remove the defeated enemy testing without removing the enemy
            this.unblockExits(room, enemy);
        } else {
            this.enemyAttacksBack(enemy);
        }
    }

    unblockExits(room, defeatedEnemy) {
        Object.entries(room.exits).forEach(([direction, exit]) => {
            // Check if this exit was guarded by the defeated enemy
            const guardIndex = exit.guardedBy.indexOf(defeatedEnemy.name);
            if (guardIndex > -1) {
                // Remove this guard from the list
                exit.guardedBy.splice(guardIndex, 1);

                // Check if there are no more guards left
                if (exit.guardedBy.length === 0) {
                    exit.pathOpen = true;
                    writeText(`The way to the ${direction} is now clear.`);
                }
            }
        });
    }


    enemyAttacksBack(enemy) {
        const diceRoll = this.rollDice();
        if (diceRoll >= 10) {
            const damage = enemy.attack - (this.playerStats.defense + (this.playerStats.equippedArmor ? this.playerStats.equippedArmor.defense : 0));
            this.playerStats.health -= damage;
            writeText(`The ${enemy.name} attacks you back for ${damage} damage. Your health is now ${this.playerStats.health}.`);
            this.handlePlayerHealth();
        } else {
            writeText(`The ${enemy.name} missed you!`);
        }
    }

    handlePlayerHealth() {
        if (this.playerStats.health <= 0) {
            writeText('You have been defeated. Game Over.');
            this.endGame();
        }
    }



    continueGame() {
        if (this.playerStats.health <= 0) {
            writeText('Game Over. You have been defeated.');
            this.endGame();
        } else if (this.currentRoom === 'treasureRoom') {
            writeText('Game Over. You\'ve won!');
            this.endGame();
        }
        // In a browser environment, no need to explicitly wait for the next command.
        // The setupInputListener method handles command input continuously.
    }

    endGame() {
        // Disable the command input field to prevent further input.
        this.commandInput.disabled = true;
        // Optionally, you could provide a way to restart the game.
        writeText('Refresh the page to play again.');
    }

    startGame() {
        writeText('Welcome to the adventure game!');
        this.showRoomInfo(this.currentRoom);
    }
}

export { TextAdventureGame };
