import { rooms } from './rooms.js';
import { writeText, typeWriter } from './writeText.js';

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
        this.audio = document.getElementById('audio');
        this.setupInputListener();
        if (initialState) {
            console.log('initialState:', initialState)
            this.currentRoom = initialState.currentRoom;
            this.playerStats = initialState.playerStats;
            this.inventory = initialState.inventory || [];
            this.rooms = initialState.rooms;
            this.inFight = initialState.inFight;

            console.log('this.currentRoom:', this.currentRoom)
            console.log('this.playerStats:', this.playerStats)
            // problem with inventory being empty, but the data is there...?
            console.log('this.inventory:', this.inventory)
        }
        else {
            // Initialize any other game state variables here
            this.playerStats = { level: 1, experience: 0, neededExp: 100, fullHealth: 20, health: 20, attack: 100, defense: 0, agility: 1, strength: 1, equippedArmor: null, equippedWeapon: null };
            this.currentRoom = 'start';
            this.inventory = [];
            this.inFight = false;
        }
        this.startGame();
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
        let statsText = "";
        let inventoryText = "";
        switch (action.toLowerCase()) {
            case 'help':
                typeWriter('Commands: go [direction], take [item], use [item], eat [item], equip [item], unequip [item], inventory, look, help, stats, attack [enemy], loot [enemy], eat [item], inspect [item]');
                break;
            case 'stats':
                statsText = this.statsText();
                typeWriter(statsText);
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
            case 'eat':
                this.food(target);
                break;
            case 'equip':
                this.equipItem(target);
                break;
            case 'unequip':
                this.unequipItem(target);
                break;
            case 'inventory':
                inventoryText = this.inventoryText();
                typeWriter(inventoryText);
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
                typeWriter('Unknown command.');
                break;
        }
        // Optionally, invoke a method to check game state or continue the game loop here.
        this.continueGame(); // Function to prompt for the next action or check game state
    }

    inventoryText() {
        const categorizedInventory = this.inventory.reduce((acc, item) => {
            const itemType = item.type || 'misc';
            if (!acc[itemType]) {
                acc[itemType] = {};
            }
            if (!acc[itemType][item.name]) {
                acc[itemType][item.name] = { ...item, count: 0 };
            }
            acc[itemType][item.name].count++;
            return acc;
        }, {});
        return Object.entries(categorizedInventory).map(([type, items]) => {
            const typeText = type === 'misc' ? '' : `${type.charAt(0).toUpperCase() + type.slice(1)}:`;
            const itemsText = Object.values(items).map(item => `${item.name} x${item.count}`).join(', ');
            return `${typeText} ${itemsText}`;
        }).join('<br>');
    }

    statsText() {
        let bonusAgility = 0;
        let bonusStrength = 0;
        if (this.playerStats.equippedWeapon && this.playerStats.equippedWeapon.bonusStats) {
            this.playerStats.equippedWeapon.bonusStats.forEach(bonus => {
                if (Object.keys(bonus)[0] === 'agility') {
                    bonusAgility += Object.values(bonus)[0];
                }
            });
        }
        if (this.playerStats.equippedArmor && this.playerStats.equippedArmor.bonusStats) {
            this.playerStats.equippedArmor.bonusStats.forEach(bonus => {
                if (Object.keys(bonus)[0] === 'agility') {
                    bonusAgility += Object.values(bonus)[0];
                }
            });
        }
        if (this.playerStats.equippedWeapon && this.playerStats.equippedWeapon.bonusStats) {
            this.playerStats.equippedWeapon.bonusStats.forEach(bonus => {
                if (Object.keys(bonus)[0] === 'strength') {
                    bonusStrength += Object.values(bonus)[0];
                }
            });
        }
        if (this.playerStats.equippedArmor && this.playerStats.equippedArmor.bonusStats) {
            this.playerStats.equippedArmor.bonusStats.forEach(bonus => {
                if (Object.keys(bonus)[0] === 'strength') {
                    bonusStrength += Object.values(bonus)[0];
                }
            });
        }

        return `Stats:<br>Level: ${this.playerStats.level}<br>Current EXP: ${this.playerStats.experience}<br>Next level: ${this.playerStats.neededExp}<br>Health: ${this.playerStats.health}/${this.playerStats.fullHealth}<br>Attack: ${this.playerStats.attack} (+${this.playerStats.equippedWeapon ? this.playerStats.equippedWeapon.attack : 0})<br>Defense: ${this.playerStats.defense} (+${this.playerStats.equippedArmor ? this.playerStats.equippedArmor.defense : 0})<br>Agility: ${this.playerStats.agility} (+${bonusAgility})<br>Strength: ${this.playerStats.strength} (+${bonusStrength})<br>Armor: ${this.playerStats.equippedArmor ? this.playerStats.equippedArmor.name : 'None'}<br>Weapon: ${this.playerStats.equippedWeapon ? this.playerStats.equippedWeapon.name : 'None'}`;
    }


    levelUp() {
        this.playerStats.experience -= this.playerStats.neededExp;
        this.playerStats.level += 1;
        this.playerStats.neededExp *= 2;
        this.playerStats.fullHealth += this.playerStats.fullHealth * 0.3;
        if (this.playerStats.health < this.playerStats.fullHealth / 2) {
            this.playerStats.health += this.playerStats.fullHealth / 2;
        } else {
            this.playerStats.health = this.playerStats.fullHealth;
        }
        this.playerStats.attack += 2;
        this.playerStats.defense += 1;
        this.playerStats.agility += 1;
        this.playerStats.strength += 1;
        typeWriter(`You've leveled up to level ${this.playerStats.level}!`);
    }

    // Game Logic Methods
    look(roomName = this.currentRoom) {
        if (this.rooms[roomName].description) {
            typeWriter(this.rooms[roomName].description);
            typeWriter(`You can see a path leading: ${Object.keys(this.rooms[roomName].exits).join(', ')}.`);
        }
        if (this.rooms[roomName].items) {
            this.rooms[roomName].items.forEach(item => {
                typeWriter(`You spot ${item.description}`);
            });
        }
        if (this.rooms[roomName].imageItems) {
            const imagePath = this.rooms[roomName].imageItems;
            const roomImageContainer = document.getElementById('roomImageContainer');
            roomImageContainer.innerHTML = `<img id="roomBG" src="${imagePath}" style="margin: auto;" alt="${this.rooms[roomName].name}">`;
        }
        if (this.rooms[roomName].enemies) {
            this.rooms[roomName].enemies.forEach(enemy => {
                if (enemy.alive) {
                    typeWriter(`You see ${enemy.description}`);
                }
                else {
                    typeWriter(`You see ${enemy.name} defeated here.`);
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
            typeWriter(item.description);
            return true;
        }
        return false;
    }

    // add in inspect inventory items to show bonus stats for weapons and armor!!!!

    inspectInventoryItems(itemName) {
        const item = this.inventory.find(item => item.name.toLowerCase() === itemName);
        if (item) {
            this.displayItemWithImage(item);
            typeWriter(item.description);

            // Maybe fix to not write out bonus stats if they are not there
            if (item.type === 'weapon' || item.type === 'armor' && item.bonusStats) {
                typeWriter(`Attack: ${item.attack || 0}, Defense: ${item.defense || 0}, Bonus Stats: ${item.bonusStats ? item.bonusStats.map(bonus => Object.keys(bonus)[0] + ': ' + Object.values(bonus)[0]).join(', ') : 'None'}`);
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
            typeWriter(enemy.description); // change to detailed description
            typeWriter(`Health: ${enemy.health}, Attack: ${enemy.attack}`);
        } else {
            typeWriter(`You don't see a ${itemName} here.`);
        }
    }

    updateRoomBackground() {
        const room = this.rooms[this.currentRoom];
        const imagePath = room.image ? `./images/${room.image}` : 'none';

        const roomImageContainer = document.getElementById('roomImageContainer');
        roomImageContainer.innerHTML = `<img id="roomBG" src="${imagePath}" style="margin: auto;" alt="${room.name}">`;
    }

    displayItemWithImage(item) {
        if (item.image) {
            const roomImageContainer = document.getElementById('roomImageContainer');
            roomImageContainer.innerHTML = `<img id="roomBG" src="./images/${item.image}" alt="${item.name}" style="width: 100%;">`;
        }
    }

    showRoomInfo(roomName) {
        // showRoomInfo function implementation
        typeWriter(this.rooms[roomName].detailedDescription);
        this.updateRoomBackground();
    }

    async moveToRoom(direction) {
        // moveToRoom function implementation
        typeWriter(`You move ${direction}...`);
        await wait(1000); // Wait for 1 second per (1000ms) before moving to the new room
        const room = this.rooms[this.currentRoom];
        let exit = room.exits[direction];

        // check if the player is in a fight
        if (this.inFight === true) {
            typeWriter('You are in a fight! You can\'t run away!');
            return;
        }

        // First check if the exit is guarded
        if (exit && typeof exit === 'object') {
            if (exit.guardedBy.length > 0) {
                typeWriter(`The way to the ${direction} is guarded by a ${exit.guardedBy.join(' and ')}.`);
                return; // Prevent moving through a guarded exit
            }
        }

        // If not guarded, then check if the exit is locked
        if (exit && typeof exit === 'object') {
            if (exit.locked) {
                typeWriter('The door is locked.');
                return; // Prevent moving through a locked door
            }
            exit = exit.roomId; // Proceed with the unlocked roomId
        } else if (!exit) {
            typeWriter(`There's no way to go ${direction} from here.`);
            return;
        }

        // Move to the new room if the exit isn't locked or och guarded is a direct roomId reference
        this.currentRoom = exit;
        this.showRoomInfo(this.currentRoom);
        // rewrite the audio source to the new room with substring or split do remove the numbers at the end of the name
        this.audio.src = './sound/' + this.currentRoom + '.mp3';
        this.audio.play();
    }

    pickUpItem(itemName) {
        // pickUpItem function implementation
        const roomItems = this.rooms[this.currentRoom].items || [];
        const itemIndex = roomItems.findIndex(item => item.name.toLowerCase() === itemName.toLowerCase());
        if (itemIndex > -1 && roomItems[itemIndex].pickup === false) {
            typeWriter(`You can't pick up the ${itemName}.`);
            return;
        }
        if (itemIndex > -1) {
            const [item] = roomItems.splice(itemIndex, 1); // Remove item from room
            this.inventory.push(item); // Add to inventory
            typeWriter(`${item.name} added to inventory.`);
        } else {
            typeWriter(`There is no ${itemName} here.`);
        }
    }

    lootEnemy(enemy) {
        const room = this.rooms[this.currentRoom];
        const enemyIndex = room.enemies.findIndex(e => e.name.toLowerCase() === enemy.toLowerCase());
        if (enemyIndex === -1) {
            typeWriter(`There is no ${enemy} here to loot.`);
            return;
        }
        enemy = room.enemies[enemyIndex];
        if (!enemy.alive && enemy.loot && enemy.loot.length > 0) {
            enemy.loot.forEach(item => {
                this.inventory.push(item);  // Add loot to player's inventory
                typeWriter(`You found a ${item.name} on the ${enemy.name}'s corpse.`);
            });
        }
        else if (enemy.alive) {
            typeWriter(`Are you mad!? You can't loot a living ${enemy.name}.`);
        }

        else {
            typeWriter(`${enemy.name} had nothing to loot.`);
        }
    }

    useItem(itemName) {
        /*const itemIndex = this.inventory.findIndex(item => item.name.toLowerCase() === itemName.toLowerCase());
        if (itemIndex === -1) {
            typeWriter(`You don't have a ${itemName}.`);
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
                    typeWriter(interaction.message);
                    if (interaction.consume) {
                        this.inventory.splice(itemIndex, 1); // Optionally remove the item from inventory
                    }
                } else {
                    typeWriter('There is nothing to unlock here.');
                }
            }
            if (!interaction.unlocks && interaction.message) {
                typeWriter(interaction.message);
            }
            
            // Add more interaction types as needed when expanding the game
        } else {
            typeWriter(`You can't use the ${itemName} here.`);
        }*/

        // new useItem function implementation
        const itemIndex = this.inventory.findIndex(item => item.name.toLowerCase() === itemName.toLowerCase());
        if (itemIndex === -1) {
            typeWriter(`You don't have a ${itemName}.`);
            return;
        }

        const room = this.rooms[this.currentRoom];
        const interaction = room.interactions?.[itemName.toLowerCase()];

        if (interaction) {
            if (interaction.unlocks) {
                // Check if the item to be unlocked is a room exit or a room item
                const exit = room.exits[interaction.unlocks];
                const roomItem = room.items.find(item => item.name.toLowerCase() === interaction.unlocks.toLowerCase());

                if (exit && typeof exit === 'object' && exit.locked) {
                    exit.locked = false; // Unlock the exit
                    typeWriter(interaction.message);
                    if (interaction.consume) {
                        this.inventory.splice(itemIndex, 1); // Optionally remove the item from inventory
                    }
                } else if (roomItem && roomItem.locked) {
                    if (roomItem.guardedBy) {
                        typeWriter(`The ${roomItem.name} is guarded by the ${roomItem.guardedBy}.`);
                        return;
                    }
                    roomItem.locked = false; // Unlock the room item
                    typeWriter(interaction.message);
                    interaction.reward.forEach(rewardItem => {
                        this.inventory.push(rewardItem);
                        typeWriter(`You received ${rewardItem.name}.`);
                    });
                    if (interaction.consume) {
                        this.inventory.splice(itemIndex, 1); // Optionally remove the item from inventory
                    }
                } else {
                    typeWriter('There is nothing to unlock here.');
                }
            } else if (interaction.reward) {
                typeWriter(interaction.message);
                interaction.reward.forEach(rewardItem => {
                    this.inventory.push(rewardItem);
                    typeWriter(`You received ${rewardItem.name}.`);
                });
                if (interaction.consume) {
                    this.inventory.splice(itemIndex, 1); // Optionally remove the item from inventory
                }
            } else if (interaction.message) {
                typeWriter(interaction.message);
                if (interaction.consume) {
                    this.inventory.splice(itemIndex, 1); // Optionally remove the item from inventory
                }
            }

            // Add more interaction types as needed when expanding the game
        } else {
            typeWriter(`You can't use the ${itemName} here.`);
        }
    }

    food(itemName) {
        const itemIndex = this.inventory.findIndex(item => item.name.toLowerCase() === itemName.toLowerCase());
        if (itemIndex === -1) {
            typeWriter(`You don't have a ${itemName}.`);
            return;
        }

        const item = this.inventory[itemIndex];
        if (item.type === 'food') {
            this.playerStats.health += item.health;
            if (this.playerStats.health > this.playerStats.fullHealth) {
                this.playerStats.health = this.playerStats.fullHealth;
            }
            typeWriter(`You ate the ${item.name}. Your health is now ${this.playerStats.health}.`);
            this.inventory.splice(itemIndex, 1); // Remove the food item from inventory
        } else {
            typeWriter(`You can't eat the ${itemName}.`);
        }
    }

    equipItem(itemName) {
        // Make sure the logical grouping is correct to properly filter items by type.
        const itemIndex = this.inventory.findIndex(item =>
            item.name.toLowerCase() === itemName.toLowerCase() && (item.type === 'armor' || item.type === 'weapon')
        );

        if (itemIndex === -1) {
            typeWriter(`You don't have ${itemName} in your inventory.`);
            return;
        }

        const item = this.inventory[itemIndex];
        if (item.equipped) {
            typeWriter(`You already have ${item.name} equipped.`);
            return;
        }

        let defense = this.playerStats.defense;
        let attack = this.playerStats.attack;

        // Equip the item based on its type
        switch (item.type) {
            case 'armor':
                if (this.playerStats.equippedArmor) {
                    typeWriter(`You already have armor equipped. Unequip it first.`);
                    return;
                }
                defense = this.playerStats.defense + item.defense;
                this.playerStats.equippedArmor = item; // Store the equipped armor for reference
                typeWriter(`You equipped the ${item.name}. Your total defense is now ${defense}.`);
                break;
            case 'weapon':
                if (this.playerStats.equippedWeapon) {
                    typeWriter(`You already have a weapon equipped. Unequip it first.`);
                    return;
                }
                attack = this.playerStats.attack + item.attack;
                this.playerStats.equippedWeapon = item; // Store the equipped weapon for reference
                typeWriter(`You equipped the ${item.name}. Your total attack is now ${attack}.`);
                if (item.bonusStats) {
                    item.bonusStats.forEach(bonus => {
                        typeWriter(`You gain ${Object.values(bonus)[0]} ${Object.keys(bonus)[0]} from the ${item.name}.`);
                    });
                }
                break;
            default:
                typeWriter('This item cannot be equipped.');
                return;
        }

        // Mark the item as equipped
        item.equipped = true;
    }

    // Fix so that weapon is not subtracting from attack when unequipped ( look at equipItem for reference )
    unequipItem(itemName) {
        // Search for the item regardless of its type but ensure it is equipped.
        const itemIndex = this.inventory.findIndex(item =>
            item.name.toLowerCase() === itemName.toLowerCase() && item.equipped
        );

        if (itemIndex === -1) {
            typeWriter(`You don't have ${itemName} equipped.`);
            return;
        }

        const item = this.inventory[itemIndex];
        switch (item.type) {
            case 'armor':
                //this.playerStats.defense -= item.defense;
                this.playerStats.equippedArmor = null; // Clear the reference
                typeWriter(`You unequipped the ${item.name}. Defense is now ${this.playerStats.defense}.`);
                break;
            case 'weapon':
                //this.playerStats.attack -= item.attack;
                this.playerStats.equippedWeapon = null; // Clear the reference
                typeWriter(`You unequipped the ${item.name}. Attack is now ${this.playerStats.attack}.`);
                break;
            default:
                typeWriter('This item cannot be unequipped.');
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
            typeWriter('There are no enemies here.');
            return;
        }

        if (room.ememyImage) {
            const roomImageContainer = document.getElementById('roomImageContainer');
            roomImageContainer.innerHTML = `<img id="roomBG" src="./images/${room.ememyImage}" alt="${room.name}">`;
        }

        const enemyIndex = room.enemies.findIndex(enemy => enemy.name.toLowerCase() === enemyName.toLowerCase());
        if (enemyIndex === -1) {
            typeWriter(`There is no ${enemyName} here to attack.`);
            return;
        }

        if (room.enemies[enemyIndex].alive === false) {
            typeWriter(`You hit the lifeless body of the ${room.enemies[enemyIndex].name}.. You feel a faint regret about it.`);
            return;
        }

        this.resolveAttack(room.enemies[enemyIndex], room, enemyIndex);
        //this.audio.src = './sound/' + room.roomId + 'fight.mp3'; // to add fight music
    }

    resolveAttack(enemy, room, enemyIndex) {
        let bonusAgility = 0;
        // THEN MAKE this two IF statements into one (perhaps turnary operator or function)
        if (this.playerStats.equippedWeapon && this.playerStats.equippedWeapon.bonusStats) {
            this.playerStats.equippedWeapon.bonusStats.forEach(bonus => {
                if (Object.keys(bonus)[0] === 'agility') {
                    bonusAgility += Object.values(bonus)[0];
                }
            });
        }

        if (this.playerStats.equippedArmor && this.playerStats.equippedArmor.bonusStats) {
            this.playerStats.equippedArmor.bonusStats.forEach(bonus => {
                if (Object.keys(bonus)[0] === 'agility') {
                    bonusAgility += Object.values(bonus)[0];
                }
            });
        }

        const diceBonus = this.playerStats.agility + bonusAgility;
        const diceRoll = this.rollDice() + diceBonus; // Add player's agility to the dice roll
        console.log('diceRoll: ' + diceRoll + " " + "player agility bonus: " + diceBonus + " " + "bonus gear agility: " + bonusAgility)
        this.inFight = true;

        if (diceRoll > 17) {
            this.attackWithCriticalHit(enemy, room, enemyIndex);
        } else if (diceRoll >= 7 && diceRoll <= 17) {
            this.attackEnemyWithNormalHit(enemy, room, enemyIndex);
        } else {
            this.missedAttack(enemy, room, enemyIndex);
        }
    }

    attackWithCriticalHit(enemy, room, enemyIndex) {
        const damage = ((this.playerStats.attack + (this.playerStats.equippedWeapon ? this.playerStats.equippedWeapon.attack : 0)) * 2) + this.playerStats.strength - enemy.defense;
        enemy.health -= damage;
        if (enemy.health <= 0) {
            enemy.health = 0;
            typeWriter(`Critical hit! You attack the ${enemy.name} for ${damage} damage, the ${enemy.name} falls to the ground.`);
            this.handleEnemyHealth(enemy, room, enemyIndex);
        } else {
            typeWriter(`You attack the ${enemy.name} for ${damage} damage, the ${enemy.name}'s health is now ${enemy.health}.`);
            this.handleEnemyHealth(enemy, room, enemyIndex);
        }
    }

    attackEnemyWithNormalHit(enemy, room, enemyIndex) {
        const damage = (this.playerStats.attack + (this.playerStats.equippedWeapon ? this.playerStats.equippedWeapon.attack : 0)) + this.playerStats.strength - enemy.defense;
        enemy.health -= damage;
        if (enemy.health <= 0) {
            enemy.health = 0;
            typeWriter(`You attack the ${enemy.name} for ${damage} damage, the ${enemy.name} falls to the ground.`);
            this.handleEnemyHealth(enemy, room, enemyIndex);
        } else {
            typeWriter(`You attack the ${enemy.name} for ${damage} damage, the ${enemy.name}'s health is now ${enemy.health}.`);
            this.handleEnemyHealth(enemy, room, enemyIndex);
        }
    }

    missedAttack(enemy) {
        typeWriter(`You missed the ${enemy.name}!`);
        this.enemyAttacksBack(enemy);
    }

    handleEnemyHealth(enemy, room, enemyIndex) {
        if (enemy.health <= 0) {
            typeWriter(`You defeated the ${enemy.name}!`);
            this.playerStats.experience += enemy.experience;
            typeWriter(`You gained ${enemy.experience} experience.`);
            if (this.playerStats.experience >= this.playerStats.neededExp) {
                this.levelUp();
            }
            typeWriter(`Your current experience is ${this.playerStats.experience}.`);
            room.enemies[enemyIndex].alive = false; // Mark the enemy as defeated
            console.log('enemy:', enemy)
            console.log(this.inFight)
            this.inFight = false;
            console.log(this.inFight)

            // No longer need to remove the enemy from the room, just need to them to be marked as dead
            // room.enemies.splice(enemyIndex, 1); // Remove the defeated enemy testing without removing the enemy

            this.unblockExits(room, enemy);
            this.unblockItems(room, enemy);
            this.updateRoomBackground();
        } else {
            this.enemyAttacksBack(enemy);
        }
    }

    unblockExits(room, defeatedEnemy) {
        Object.entries(room.exits).forEach(([direction, exit]) => {
            // Check if this exit was guarded by the defeated enemy
            // Making sure guardedBy is an array before checking
            if (Array.isArray(exit.guardedBy)) {
                const guardIndex = exit.guardedBy.indexOf(defeatedEnemy.name);
                if (guardIndex > -1) {
                    // Remove this guard from the list
                    exit.guardedBy.splice(guardIndex, 1);

                    // Check if there are no more guards left
                    if (exit.guardedBy.length === 0) {
                        exit.pathOpen = true;
                        typeWriter(`The way to the ${direction} is now clear.`);
                    }
                }
            } else {
                console.error(`Error: 'guardedBy is not properly initialized for the exit to the ${direction}.`)
            }
        });
    }
    unblockItems(room, defeatedEnemy) {
        if (!room.items) return;
        Object.entries(room.items).forEach(([item, itemObj]) => {
            // Check if this exit was guarded by the defeated enemy
            // Making sure guardedBy is an array before checking
            if (Array.isArray(itemObj.guardedBy)) {
                const guardIndex = itemObj.guardedBy.indexOf(defeatedEnemy.name);
                if (guardIndex > -1) {
                    // Remove this guard from the list
                    itemObj.guardedBy.splice(guardIndex, 1);

                    // Check if there are no more guards left
                    if (itemObj.guardedBy.length === 0) {
                        itemObj.locked = false;
                        typeWriter(`The ${itemObj.name} is no longer guarded.`);
                    }
                }
            } else {
                console.error(`Error: 'guardedBy is not properly initialized for the exit to the ${item}.`)
            }
        });
    }

    enemyAttacksBack(enemy) {
        if (enemy.alive === false) {
            return;
        }
        const diceRoll = this.rollDice();
        if (diceRoll >= 10) {
            const damage = enemy.attack - (this.playerStats.defense + (this.playerStats.equippedArmor ? this.playerStats.equippedArmor.defense : 0));
            this.playerStats.health -= damage;
            typeWriter(`The ${enemy.name} attacks you for ${damage} damage, your health is now ${this.playerStats.health}.`);
            this.handlePlayerHealth();
        } else {
            typeWriter(`The ${enemy.name} missed you!`);
        }
    }

    handlePlayerHealth() {
        if (this.playerStats.health <= 0) {
            typeWriter('You have been defeated. Game Over.');
            this.endGame();
        }
    }



    continueGame() {
        if (this.playerStats.health <= 0) {
            typeWriter('Game Over. You have been defeated.');
            this.endGame();
        } else if (this.currentRoom === 'treasureRoom') {
            typeWriter('Game Over. You\'ve won!');
            this.endGame();
        }
        // In a browser environment, no need to explicitly wait for the next command.
        // The setupInputListener method handles command input continuously.
    }

    endGame() {
        // Disable the command input field to prevent further input.
        this.commandInput.disabled = true;
        // Optionally, you could provide a way to restart the game.
        typeWriter('Refresh the page to play again.');
    }

    startGame() {
        typeWriter('Welcome to Quest of legends!');
        this.showRoomInfo(this.currentRoom);
    }
}

export { TextAdventureGame };
