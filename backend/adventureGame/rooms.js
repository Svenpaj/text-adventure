export const rooms = {
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
        description: 'You are in a large library...',
        exits: {
            east: 'hallway',
            north: { roomId: 'secretRoom', locked: true }, // Indicate that the exit is initially locked
        },
        items: [
            { name: 'key', description: 'A small, ornate key lies here.' },
        ],
        interactions: {
            key: {
                unlocks: 'north',
                message: 'You use the key to unlock the door to the north.',
                consume: true, // Whether the item should be removed from the inventory after use
            },
        },
    },
    secretRoom: {
        description: 'You\'ve discovered a secret room! There\'s something shiny here.',
        exits: {
            south: 'library',
        },
        requires: 'key', // This exit requires a key.
    },
    treasureRoom: {
        description: 'You\'ve found the treasure room! Congratulations!',
        exits: {},
    },
    requires: 'treasureKey', // This exit requires a key.
};
