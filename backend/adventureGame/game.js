import readline from 'readline';
import { rooms } from './rooms.js';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});
let playerStats = { health: 10, attack: 10, defense: 0, equippedArmor: null, equippedWeapon: null };
let currentRoom = 'start';
const inventory = [];

function look(roomName) {
    console.log(`You are in the ${roomName}. And you can see exits to the ${Object.keys(rooms[roomName].exits).join(', ')}.`);
    if (!rooms[roomName].detailedDescription) {
        console.log(rooms[roomName].detailedDescription)
    }
    if (rooms[roomName].items) {
        rooms[roomName].items.forEach(item => {
            console.log(`You spot a ${item.description}`);
        });
    }
    if (rooms[roomName].enemies) {
        rooms[roomName].enemies.forEach(enemy => {
            console.log(`You see a ${enemy.name}`);
        });
    }
}
// fix inspect function
function inspect(itemName) {
    if (rooms[currentRoom].items) {
        const itemIndex = rooms[currentRoom].items.findIndex(item => item.name.toLowerCase() === itemName.toLowerCase());
        if (itemIndex > -1) {
            console.log(rooms[currentRoom].items[itemIndex]);
        } else if (inventory.length > 0) {
            const inventoryItemIndex = inventory.findIndex(item => item.name.toLowerCase() === itemName.toLowerCase());
            if (inventoryItemIndex > -1) {
                console.log(inventory[inventoryItemIndex].description);
            } else {
                console.log(`You don't see nor have a ${itemName}.`);
            }
        }
    }
}

function showRoomInfo(roomName) {
    console.log(rooms[roomName].description);
}

function moveToRoom(direction) {
    const room = rooms[currentRoom];
    let exit = room.exits[direction];

    if (exit && typeof exit === 'object' && exit.guarded) {
        room.enemies.forEach(enemy => {
            if (enemy.guarding) {
                console.log(`The way to the ${direction} is guarded by by a ${enemy.name}.`);
                return; // Prevent moving through a guarded exit
            }
        })
    }

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
        if (enemy.guarding) {
            for (const direction in room.exits) {
                const exit = room.exits[direction];
                if (exit && typeof exit === 'object' && exit.guarded) {
                    console.log(`The ${enemy.name} was guarding the way to the ${direction}.`);
                    exit.guarded = false; // Remove the guard
                }
            }
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
            case 'help': console.log('Commands: go [direction], take [item], use [item], equip [item], unequip [item], inventory, look, help'); break;
            case 'stats': console.log('Stats:', playerStats); break;
            case 'go': moveToRoom(target); break;
            case 'take': pickUpItem(target); break;
            case 'use': useItem(target); break;
            case 'equip': equipItem(target); break;
            case 'unequip': unequipItem(target); break;
            case 'inventory': console.log('Inventory:', inventory.map(item => item.name).join(', ')); break;
            case 'inspect': inspect(target); break; // Placeholder for inspect command
            case 'look': look(currentRoom); break;
            case 'attack': attackEnemy(target); break;
            default: console.log('Unknown command.'); break;


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

        }

        continueGame(); // Function to prompt for the next action or check game state
    });
}

function continueGame() {
    if (playerStats.health <= 0) {
        console.log('Game Over. You have been defeated.');
        rl.close();
    } else if (currentRoom === 'treasureRoom') {
        console.log('Game Over. You\'ve won!');
        rl.close();
    } else {
        waitForCommand(); // Wait for the next command
    }
}

startGame();