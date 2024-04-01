import readline from 'readline';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

let currentRoom = 'start';

const rooms = {
    start: {
        description: 'You are in a small room. There is a door to the north.',
        exits: {
            north: 'hallway',
        },
    },
    hallway: {
        description: 'You are in a long hallway. There is a door to the south and another to the west.',
        exits: {
            south: 'start',
            west: 'library',
        },
    },
    library: {
        description: 'You are in a large library. You see rows of books and a strange door to the north that seems locked.',
        exits: {
            east: 'hallway',
            north: 'secretRoom', // This will require a key, we'll check for it in the logic.
        },
        requires: 'key', // This exit requires a key.
    },
    secretRoom: {
        description: 'You\'ve discovered a secret room! There\'s something shiny here.',
        exits: {
            south: 'library',
        },
    },
    treasureRoom: {
        description: 'You\'ve found the treasure room! Congratulations!',
        exits: {},
    },
};

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