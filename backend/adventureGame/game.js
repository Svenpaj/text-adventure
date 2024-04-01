import readline from 'readline';
import { rooms } from './rooms.js';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});
let playerStats = { health: 10, attack: 1, defense: 0, equippedArmor: null, equippedWeapon: null };
let currentRoom = 'start';
const inventory = [];

function showRoomInfo(roomName) {
    console.log(rooms[roomName].description);
    if (rooms[roomName].items) {
        rooms[roomName].items.forEach(item => {
            console.log(item.description);
        });
    }
    // Display enemies in the room if any - this is a new feature - does not work at this time - will need to be fixed
    if (rooms[roomName].enemies) {
        console.log('Enemies present in the room:')
        rooms[roomName].enemies.forEach(enemy => {
            console.log(`${enemy.description} (${enemy.health} HP, ${enemy.attack} ATK)`);
        });
    }
    console.log('Exits:', Object.keys(rooms[roomName].exits).join(', '));
}

function moveToRoom(direction) {
    const room = rooms[currentRoom];
    let exit = room.exits[direction];

    // Check if the exit is an object with a roomId (which may also include a locked state)
    if (exit && typeof exit === 'object') {
        if (exit.locked) {
            console.log('The door is locked.');
            return; // Prevent moving through a locked door
        }
        exit = exit.roomId; // Proceed with the unlocked roomId
    } else if (!exit) {
        console.log(`There's no way to go ${direction} from here.`);
        return;
    }

    // Move to the new room if the exit isn't locked or is a direct roomId reference
    currentRoom = exit;
    showRoomInfo(currentRoom);
}

function pickUpItem(itemName) {
    const roomItems = rooms[currentRoom].items || [];
    const itemIndex = roomItems.findIndex(item => item.name.toLowerCase() === itemName.toLowerCase());
    if (itemIndex > -1) {
        const [item] = roomItems.splice(itemIndex, 1); // Remove item from room
        inventory.push(item); // Add to inventory
        console.log(`${item.name} added to inventory.`);
    } else {
        console.log(`There is no ${itemName} here.`);
    }
}

function useItem(itemName) {
    const itemIndex = inventory.findIndex(item => item.name.toLowerCase() === itemName.toLowerCase());
    if (itemIndex === -1) {
        console.log(`You don't have a ${itemName}.`);
        return;
    }

    const item = inventory[itemIndex];
    const room = rooms[currentRoom];
    const interaction = room.interactions?.[itemName.toLowerCase()];

    if (interaction) {
        if (interaction.unlocks) {
            const exit = room.exits[interaction.unlocks];
            if (exit && typeof exit === 'object' && exit.locked) {
                exit.locked = false; // Unlock the exit
                console.log(interaction.message);
                if (interaction.consume) {
                    inventory.splice(itemIndex, 1); // Optionally remove the item from inventory
                }
            } else {
                console.log('There is nothing to unlock here.');
            }
        }
        // Add more interaction types as needed
    } else {
        console.log(`You can't use the ${itemName} here.`);
    }
}

function equipItem(itemName) {
    const itemIndex = inventory.findIndex(item => item.name.toLowerCase() === itemName.toLowerCase() && item.type === 'armor' || item.type === 'weapon');
    if (itemIndex === -1) {
        console.log(`You don't have ${itemName} in your inventory.`);
        return;
    }

    const item = inventory[itemIndex];
    // Equip the item based on its type
    switch (item.type) {
        case 'armor':
            playerStats.defense += item.defense;
            playerStats.equippedArmor = item; // Store the equipped armor for reference
            console.log(`You equipped the ${item.name}. Defense is now ${playerStats.defense}.`);
            break;
        case 'weapon':
            playerStats.attack += item.attack;
            playerStats.equippedWeapon = item; // Store the equipped weapon for reference
            console.log(`You equipped the ${item.name}. Attack is now ${playerStats.attack}.`);
            break;
        default:
            console.log('This item cannot be equipped.');
            return;
    }

    // Mark the item as equipped
    item.equipped = true;
}

/*function equipWeapon(itemName) {
    const itemIndex = inventory.findIndex(item => item.name.toLowerCase() === itemName.toLowerCase() && item.type === 'weapon');
    if (itemIndex === -1) {
        console.log(`You don't have a ${itemName} to equip.`);
        return;
    }

    const weapon = inventory[itemIndex];
    playerStats.attack += weapon.attack; // Adjust player stats based on the weapon
    console.log(`You equipped the ${weapon.name}. Attack is now ${playerStats.attack}.`);
    // Consider how you'll handle swapping weapons or unequipping items.

    // Mark the weapon as equipped
    weapon.equipped = true;
}

function unequipWeapon(itemName) {
    const itemIndex = inventory.findIndex(item => item.name.toLowerCase() === itemName.toLowerCase() && item.type === 'weapon' && item.equipped);
    if (itemIndex === -1) {
        console.log(`You don't have ${itemName} equipped.`);
        return;
    }

    const weapon = inventory[itemIndex];
    playerStats.attack -= weapon.attack;
    console.log(`You unequipped the ${itemName}. Attack is now ${playerStats.attack}.`);

    // Mark the weapon as unequipped
    weapon.equipped = false;
}*/


function unequipItem(itemName) {
    const itemIndex = inventory.findIndex(item => item.name.toLowerCase() === itemName.toLowerCase() && item.type === 'armor' && item.equipped);
    if (itemIndex === -1) {
        console.log(`You don't have ${itemName} equipped.`);
        return;
    }

    const item = inventory[itemIndex];
    // Equip the item based on its type
    switch (item.type) {
        case 'armor':
            playerStats.defense -= item.defense;
            console.log(`You unequipped the ${item.name}. Defense is now ${playerStats.defense}.`);
            break;
        case 'weapon':
            playerStats.attack -= item.attack;
            console.log(`You unequipped the ${item.name}. Attack is now ${playerStats.attack}.`);
            break;
        default:
            console.log('This item cannot be unequipped.');
            return;
    }

    // Mark the item as unequipped
    item.equipped = false;
}

function attackEnemy(enemyName) {
    const room = rooms[currentRoom];
    if (!room.enemies) {
        console.log('There are no enemies here.');
        return;
    }

    const enemyIndex = room.enemies.findIndex(enemy => enemy.name.toLowerCase() === enemyName.toLowerCase());
    if (enemyIndex === -1) {
        console.log(`There is no ${enemyName} here to attack.`);
        return;
    }

    const enemy = room.enemies[enemyIndex];
    // Simple combat calculation
    enemy.health -= playerStats.attack;
    console.log(`You attack the ${enemy.name} for ${playerStats.attack} damage. Its health is now ${enemy.health}.`);

    if (enemy.health <= 0) {
        console.log(`You defeated the ${enemy.name}!`);
        room.enemies.splice(enemyIndex, 1); // Remove the defeated enemy
    } else {
        // Enemy attacks back
        playerStats.health -= enemy.attack;
        console.log(`The ${enemy.name} attacks you back for ${enemy.attack} damage. Your health is now ${playerStats.health}.`);
        if (playerStats.health <= 0) {
            console.log('You have been defeated. Game Over.');
            rl.close();
        }
    }
}

function startGame() {
    console.log('Welcome to the adventure game!');
    showRoomInfo(currentRoom);
    waitForCommand();
}

function waitForCommand() {
    rl.question('What do you want to do? => ', (command) => {
        const [action, ...rest] = command.toLowerCase().split(' ');
        const target = rest.join(' ');

        switch (action) {
            case 'go': moveToRoom(target); break;
            case 'take': pickUpItem(target); break;
            case 'use': useItem(target); break;
            case 'equip': equipItem(target); break;
            case 'unequip': unequipItem(target); break;
            case 'inventory': console.log('Inventory:', inventory.map(item => item.name).join(', ')); break;
            case 'stats': console.log('Stats:', playerStats); break;
            /*case 'equip':
                if (target.includes("sword") || target.includes("dagger")) { // Simple check to differentiate weapon types
                    equipWeapon(target);
                } else {
                    equipItem(target); // For non-weapon equipment
                }
            case 'unequip':
                if (target.includes("sword") || target.includes("dagger")) { // Simple check to differentiate weapon types
                    unequipWeapon(target);
                } else {
                    unequipItem(target); // For non-weapon equipment
                }*/
            case 'attack': attackEnemy(target); break;
            default: console.log('Unknown command.'); break;
        }

        continueGame(); // Function to prompt for the next action or check game state
    });
}

function continueGame() {
    if (currentRoom === 'treasureRoom') {
        console.log('Game Over. You\'ve won!');
        rl.close();
    } else {
        waitForCommand(); // Wait for the next command
    }
}

startGame();