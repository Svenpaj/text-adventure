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
