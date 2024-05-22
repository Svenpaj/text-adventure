export const rooms = {
    start: {
        description: 'You are in a small room. There is a door to the north.',
        detailedDescription: `The room has stone walls, cool and imposing, their texture rough under the fingertips. The tapestries on the floor, despite their age, still hint at the vibrant stories they once depicted. The wooden door to the north stands slightly open, as if inviting the curious to discover the secrets it guards. Amidst the quiet, the only sounds are the soft rustle of the scrolls and the occasional creak of the old wooden furniture, each piece whispering tales of the past. This room, a small chapter in the castle's grand history, holds the weight of untold stories.`,
        image: 'startRoom2.webp',
        exits: {
            north: { roomId: 'hallway', locked: false, description: 'a wooden door.', guardedBy: [], pathOpened: true },
        },
    },
    hallway: {
        description: 'You are in a long hallway. There is a door to the back to the south and another to the west. You also see a golden door to the north.',
        image: 'hallway3small.webp',
        imageEnemies: 'hallwayEnemies.webp',
        exits: {
            south: { roomId: 'start', locked: false, description: 'a wooden door.', guardedBy: [], pathOpened: true },
            west: { roomId: 'library', locked: false, description: 'a strange but beautiful door.', guardedBy: [], pathOpened: true },
            north: { roomId: 'treasureRoom', locked: true, description: 'a big majestic golden door.', guardedBy: ['Goblin', 'Orc'], pathOpened: false },
            east: { roomId: 'kitchen', locked: false, description: 'a wooden door.', guardedBy: [], pathOpened: true },
        },
        enemies: [
            {
                name: 'Goblin', description: 'little weak goblin.', alive: true, health: 5, attack: 1, defense: 1, experience: 50, loot:
                    [{ name: 'Dagger', description: 'a rusty dagger.', type: 'weapon', attack: 1, equipped: false }]
            },
            {
                name: 'Orc', description: 'big, strong orc.', alive: true, health: 10, attack: 2, defense: 1, experience: 100, loot: [
                    { name: 'Axe', description: 'a sharp axe.', type: 'weapon', attack: 2, equipped: false }
                ]
            }
        ],
        interactions: {
            'golden key': {
                unlocks: 'north',
                message: 'You use the golden key to unlock the door to the golden door.',
                consume: true,
            },
        },
    },
    kitchen: {
        description: 'You are in a kitchen. There is a door to the east.',
        image: 'kitchenBoss.webp',
        imageItems: 'kitchenItems.webp',
        exits: {
            east: { roomId: 'hallway', locked: false, description: 'a wooden door.', guardedBy: ['Butcher'], pathOpened: false },
        },
        enemies: [
            {
                name: 'Butcher', description: 'a big, burly butcher.', alive: true, health: 30, attack: 4, defense: 1, experience: 300, loot: [{ name: 'Cleaver', description: 'a sharp cleaver.', type: 'weapon', attack: 4, equipped: false }]
            },
        ],
        items: [
            { name: 'Apple', description: 'a juicy red apple.', type: 'food', health: 5 },
            { name: 'Bread', description: 'a loaf of bread.', type: 'food', health: 7 },
        ],
    },
    library: {
        description: 'You are in a dusty old library. There is a door to the east and a strange door to the north.',
        image: 'librarysmall.webp',
        imageItems: 'libraryItems.webp',
        exits: {
            east: { roomId: 'hallway', locked: false, description: 'a wooden door.', guardedBy: [], pathOpened: true },
            north: { roomId: 'secretRoom', locked: true, guardedBy: [], pathOpened: true }, // Indicate that the exit is initially locked
        },
        items: [
            { name: 'Ornate key', description: 'small ornate key.' },
            { name: 'Leather Armor', description: 'sturdy set of leather armor.', type: 'armor', defense: 2, equipped: false },
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
            south: { roomId: 'library', locked: false, description: 'a wooden door.', guardedBy: [], pathOpened: true },
        },
        items: [
            { name: 'Golden key', description: 'a shiny golden key.' },
            { name: 'Silver Sword', description: 'a gleaming silver sword.', type: 'weapon', attack: 3, equipped: false, image: 'silverSword.webp' },
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

    // Add more rooms as needed
};

