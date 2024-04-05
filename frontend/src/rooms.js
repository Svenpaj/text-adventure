export const rooms = {
    start: {
        description: 'You are in a small room. There is a door to the north.',
        detailedDescription: `The room has stone walls, cool and imposing, their texture rough under the fingertips. The tapestries on the floor, despite their age, still hint at the vibrant stories they once depicted. The wooden door to the north stands slightly open, as if inviting the curious to discover the secrets it guards. Amidst the quiet, the only sounds are the soft rustle of the scrolls and the occasional creak of the old wooden furniture, each piece whispering tales of the past. This room, a small chapter in the castle's grand history, holds the weight of untold stories.`,
        image: 'startRoom2.webp',
        exits: {
            north: 'hallway',
        },
    },
    hallway: {
        description: 'You are in a long hallway. There is a door to the back to the south and another to the west. You also see a golden door to the north.',
        image: 'hallway.webp',
        imageEnemies: 'hallwayEnemies.webp',
        exits: {
            south: 'start',
            west: 'library',
            north: { roomId: 'treasureRoom', locked: true, description: 'a sneaky goblin is guarding the door.', guarded: true },
        },
        enemies: [
            { name: 'Goblin', description: 'a little weak goblin.', health: 5, attack: 1, guarding: true },
            { name: 'Orc', description: 'a big, strong orc.', health: 10, attack: 2, guarding: false }
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
        image: 'library.webp',
        imageItems: 'libraryItems.webp',
        exits: {
            east: 'hallway',
            north: { roomId: 'secretRoom', locked: true }, // Indicate that the exit is initially locked
        },
        items: [
            { name: 'Ornate key', description: 'a small ornate key.' },
            { name: 'Leather Armor', description: 'a sturdy set of leather armor.', type: 'armor', defense: 2, equipped: false },
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
        description: 'You\'ve discovered a secret room!',
        detailedDescription: 'There\'s something shiny here. You squint and see a golden key tucked away behind some dusty old books. You also see a door to the south.',
        image: 'secretRoom.webp',
        imageItems: 'secretRoomItems.webp',
        exits: {
            south: 'library',
        },
        items: [
            { name: 'Golden key', description: 'a shiny golden key.' },
            { name: 'Silver Sword', description: 'a gleaming silver sword.', type: 'weapon', attack: 3, equipped: false },
        ],
        requires: 'key', // This exit requires a key.
    },
    treasureRoom: {
        description: 'You\'ve found the treasure room! Congratulations!',
        detailedDescription: 'The room is filled with gold and jewels, sparkling in the dim light. You see a door to the south.',
        image: 'treasureRoom.webp',
        exits: {},
    },
    requires: 'golden key', // This exit requires a key.
};

