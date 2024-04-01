import readline from 'readline';
import { rooms } from './rooms.js';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

let currentRoom = 'start';
const inventory = [];

function showRoomInfo(roomName) {
    console.log(rooms[roomName].description);
    if (rooms[roomName].items) {
        rooms[roomName].items.forEach(item => {
            console.log(item.description);
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

function startGame() {
    console.log('Welcome to the adventure game!');
    showRoomInfo(currentRoom);
    waitForCommand();
}

function waitForCommand() {
    rl.question('What do you want to do? ', (command) => {
        // Extract the action (first word) and the rest of the command as the item name
        const [action, ...rest] = command.toLowerCase().split(' ');
        const itemName = rest.join(' '); // Join the rest back together for multi-word item names

        if (action === 'go') {
            moveToRoom(itemName);
        } else if (action === 'take') {
            pickUpItem(itemName);
        } else if (action === 'use') {
            useItem(itemName);
        } else if (action === 'inventory') {
            console.log('Inventory:', inventory.map(item => item.name).join(', '));
        } else if (action === 'look') {
            console.log('Inventory:', inventory.map(item => item.name).join(', '));
        } else {
            console.log('Unknown command.');
        }

        // Check for game end condition or other global checks here
        continueGame();
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