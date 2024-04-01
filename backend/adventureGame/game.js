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
    const exits = rooms[roomName].exits;
    console.log('Exits:', Object.keys(exits).join(', '));
}

function moveToRoom(direction) {
    const newRoom = rooms[currentRoom].exits[direction];
    if (newRoom) {
        if (rooms[newRoom].requires && !inventory.includes(rooms[newRoom].requires)) {
            console.log(`You need a ${rooms[newRoom].requires} to go this way.`);
        } else {
            currentRoom = newRoom;
            showRoomInfo(currentRoom);
        }
    } else {
        console.log(`There's no way to go ${direction} from here.`);
    }
}

function startGame() {
    console.log('Welcome to the adventure game!');
    showRoomInfo(currentRoom);
    waitForCommand();
}

function waitForCommand() {
    rl.question('What do you want to do? ', (command) => {
        const [action, itemOrDirection] = command.toLowerCase().split(' ');

        if (action === 'go') {
            moveToRoom(itemOrDirection);
        } else if (action === 'take' && rooms[currentRoom].items?.includes(itemOrDirection)) {
            inventory.push(itemOrDirection);
            console.log(`${itemOrDirection} added to inventory.`);
        } else {
            console.log('Unknown command.');
        }

        if (currentRoom === 'treasureRoom') {
            console.log('Game Over. You\'ve won!');
            rl.close();
        } else {
            waitForCommand(); // Wait for the next command
        }
    });
}

startGame();