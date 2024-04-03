export const rooms = {
    start: {
        description: 'You are in a small room. There is a door to the north.',
        exits: {
            north: 'hallway',
        },
    },
    hallway: {
        description: 'You are in a long hallway. There is a door to the back to the south and another to the west. You also see a golden door to the north.',
        exits: {
            south: 'start',
            west: 'library',
            north: { roomId: 'treasureRoom', locked: true },
        },
        enemies: [
            { name: 'Goblin', description: 'A sneaky goblin is blocking your way.', health: 5, attack: 1 },
        ],
        interactions: {
            'golden key': {
                unlocks: 'north',
                message: 'You use the golden key to unlock the door to the golden door.',
                consume: true,
            },
        },
    },
    library: {
        description: 'You are in a dusty old library. There is a door to the east and a strange door to the north.',
        exits: {
            east: 'hallway',
            north: { roomId: 'secretRoom', locked: true }, // Indicate that the exit is initially locked
        },
        items: [
            { name: 'Ornate key', description: 'A small, ornate key lies here.' },
            { name: 'Leather Armor', description: 'A sturdy set of leather armor lies here.', type: 'armor', defense: 2, equipped: false },
        ],
        interactions: {
            'ornate key': {
                unlocks: 'north',
                message: 'You use the key to unlock the door to the north.',
                consume: true, // Whether the item should be removed from the inventory after use
            },
        },
    },
    secretRoom: {
        description: 'You\'ve discovered a secret room! There\'s something shiny here. You squint and see a golden key tucked away behind some dusty old books.',
        exits: {
            south: 'library',
        },
        items: [
            { name: 'Golden key', description: 'A shiny golden key is here.' },
            { name: 'Silver Sword', description: 'A gleaming silver sword is propped up against the wall.', type: 'weapon', attack: 3, equipped: false },
        ],
        requires: 'key', // This exit requires a key.
    },
    treasureRoom: {
        description: 'You\'ve found the treasure room! Congratulations!',
        exits: {},
    },
    requires: 'golden key', // This exit requires a key.
}
};
