export const rooms = {
    /*start: {
        description: 'You are in a small room. There is a door to the north.',
        detailedDescription: `The room has stone walls, cool and imposing, their texture rough under the fingertips. The tapestries on the floor, despite their age, still hint at the vibrant stories they once depicted. The wooden door to the north stands slightly open, as if inviting the curious to discover the secrets it guards. Amidst the quiet, the only sounds are the soft rustle of the scrolls and the occasional creak of the old wooden furniture, each piece whispering tales of the past. This room, a small chapter in the castle's grand history, holds the weight of untold stories.`,
        image: 'summer6.png',
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
                    [{ name: 'Dagger', description: 'a rusty dagger.', type: 'weapon', attack: 1, equipped: false, bonusStats: [{ agility: 2 }] }]
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
        image: 'kitchenPixel.webp',
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

    */

    // First small chapter of the game (containing Plains / Forrest / Castle Garden)

    plainsStart: {
        description: 'You are on a field.',
        detailedDescription: 'You find yourself on a wide open field. The sun is shining, the birds are singing, and the grass is swaying gently in the breeze. There are a lots of flowers around you. And a few rabbits and squrriels are hopping around.',
        image: 'summer5.png',
        exits: {
            north: { roomId: 'plains8', locked: false, description: 'a path leading north.', guardedBy: [], pathOpened: true },
            south: { roomId: 'plains7', locked: false, description: 'a path leading south.', guardedBy: [], pathOpened: true },
            east: { roomId: 'plains10', locked: false, description: 'a path leading east.', guardedBy: [], pathOpened: true },
            west: { roomId: 'plains1', locked: false, description: 'a path leading west.', guardedBy: [], pathOpened: true },
        },
        enemies: [
            {
                name: 'Rabbit', description: 'a fluffy white rabbit.', alive: true, health: 3, attack: 0, defense: 0, experience: 10, loot: [{ name: 'Carrot', description: 'a crunchy carrot.', type: 'food', health: 5 }]
            },
            {
                name: 'Rabbit', description: 'a fluffy white rabbit.', alive: true, health: 3, attack: 0, defense: 0, experience: 10, loot: [{ name: 'Carrot', description: 'a crunchy carrot.', type: 'food', health: 5 }]
            },
            {
                name: 'Squrriel', description: 'a cute squrriel.', alive: true, health: 2, attack: 1, defense: 0, experience: 10, loot: [{ name: 'Acorn', description: 'a shiny acorn.', type: 'food', health: 3 }]
            },
        ],
        items: [
            { name: 'Flower', description: 'beautiful flower.', type: 'food', health: 2 },
            { name: 'Stick', description: 'sturdy stick.', type: 'weapon', attack: 1, equipped: false },
        ],
    },
    plains1: {
        description: 'You are on a field.',
        detailedDescription: 'You find yourself futher out on the field. The sun is shining, and there is a gentle breeze blowing. You can hear birds sining in the distance. There is a odor of flowers in the air. The grass is swaying gently in the breeze. It has a calming effect on you. You hear some rasping sound from the bushes.',
        image: 'summer5.png',
        exits: {
            north: { roomId: 'plains6', locked: false, description: 'a path leading north.', guardedBy: [], pathOpened: true },
            south: { roomId: 'plains5', locked: false, description: 'a path leading south.', guardedBy: [], pathOpened: true },
            west: { roomId: 'plains2', locked: false, description: 'a path leading west.', guardedBy: [], pathOpened: true },
            east: { roomId: 'plainsStart', locked: false, description: 'a path leading east.', guardedBy: [], pathOpened: true },
        },
        enemies: [
            {
                name: 'Rabbit', description: 'a fluffy white rabbit.', alive: true, health: 3, attack: 0, defense: 0, experience: 10, loot: [{ name: 'Carrot', description: 'a crunchy carrot.', type: 'food', health: 5 }]
            },
            {
                name: 'Squrriel', description: 'a cute squrriel.', alive: true, health: 2, attack: 1, defense: 0, experience: 10, loot: [{ name: 'Acorn', description: 'a shiny acorn.', type: 'food', health: 3 }]
            },
            {
                name: "Dolie", description: "a small peaceful creature that's commenly called 'Flower people'.", alive: true, health: 5, attack: 1, defense: 1, experience: 20, loot: [{ name: 'Purple flower', description: 'beautiful purple flower.', type: 'food', health: 2 }]
            },
        ],
        items: [
            { name: 'Flower', description: 'beautiful flower.', type: 'food', health: 2 },
            { name: 'Stick', description: 'sturdy stick.', type: 'weapon', attack: 1, equipped: false },
        ],
    },
    plains2: {
        description: 'You are on a field.',
        detailedDescription: 'You find yourself far out on the field to the west. There is a cliff to the west. It does not seem to be possible to climb down. You will have to find a another way forward. You can hear the ocean far out in the distance in the same direction as the cliff. The peacefulness and the beauty of the nature that surrounds you is breathtaking. So you relax a moment to savor this moment. In the far distance to the south, you can see something that looks like smoke coming from a chimney.',
        image: 'summer2.png',
        exits: {
            north: { roomId: 'plains4', locked: false, description: 'a path leading north.', guardedBy: [], pathOpened: true },
            south: { roomId: 'plains3', locked: false, description: 'a path leading south.', guardedBy: [], pathOpened: true },
            east: { roomId: 'plains1', locked: false, description: 'a path leading east.', guardedBy: [], pathOpened: true },
        },
        enemies: [
            {
                name: 'Rabbit', description: 'a fluffy white rabbit.', alive: true, health: 3, attack: 0, defense: 0, experience: 10
            },
            {
                name: 'Squrriel', description: 'a cute squrriel.', alive: true, health: 2, attack: 1, defense: 0, experience: 10, loot: [{ name: 'Acorn', description: 'a shiny acorn.', type: 'food', health: 3 }]
            },
        ],
    },
    plains3: {
        description: 'You are at a house.',
        detailedDescription: 'You followed the path south and you find yourself in a small clearing. There is a small house in front of you. The house looks very intact and from what you can see it has been taking well care of. There is a small garden with some animals and plats. As you enter the garden you see a farmer working in the garden. She looks up and smiles at you. She looks friendly and you feel a sense of calmness and peace. You see several pots close to the house with flowers in them with the colors that almost looks like a rainbow, but two pots are empty. You see orange, yellow, green, blue, and indigo.',
        image: 'summer1.png',
        exits: {
            north: { roomId: 'plains2', locked: false, description: 'a path leading north.', guardedBy: [], pathOpened: true },
        },
        items: [
            { name: 'Apple', description: 'a juicy red apple.', type: 'food', health: 5 },
            { name: 'Cabbage', description: 'a fresh cabbage.', type: 'food', health: 7 },
            { name: 'Water pouch', description: 'a pouch of water.', type: 'food', health: 3 },
            { name: 'Bread', description: 'a loaf of bread.', type: 'food', health: 7 },
        ],
        enemies: [
            {
                name: 'Farmer', description: 'a friendly farmer.', alive: true, health: 15, attack: 1, defense: 1, experience: 100, loot: [{ name: 'Pitchfork', description: 'a rusty pitchfork.', type: 'weapon', attack: 2, equipped: false }]
            },
            {
                name: 'Chicken', description: 'a small chicken.', alive: true, health: 2, attack: 0, defense: 0, experience: 10, loot: [{ name: 'Egg', description: 'a fresh egg.', type: 'food', health: 3 }]
            },
            {
                name: 'Cow', description: 'a big cow.', alive: true, health: 10, attack: 1, defense: 1, experience: 50, loot: [{ name: 'Milk', description: 'a bucket of milk.', type: 'food', health: 5 }]
            },
        ],
        interactions: {
            'purple flower': {
                message: 'You give the purple flower to the farmer. The farmer smiles and giggles. She tells you that she loves purple flowers and that she will give you a gift in return. <br> The farmer whispers in your ear: "When you reach the forrest, go as far as you can to the east. There you will find a cave. In the cave you will find a treasure. To be able to enter the cave you need a to speak a secret phrase, I do not know of this phrase, but perhaps you will aquire such knowledge.. But be careful, the cave is guarded by a big bear. But I think you can handle it."',
                consume: true, // Whether the item should be removed from the inventory after use
            },
            'red flower': {
                message: 'You give the red flower to the farmer. The farmer smiles and giggles. She tells you that she loves red flowers and that she will give you a gift in return. <br> The farmer starts to tell you a story about a man that once was a great warrior turned into a werewolf by a witch. The half man half wolf started to terrorize the village. Until one day a young girl that lived in the village were attacked but managed to escape after she had defender herself with a silver spoon"',
                consume: true, // Whether the item should be removed from the inventory after use
            },
        },
    },
    plains4: {
        description: 'You are on a field.',
        detailedDescription: 'You find yourself far out on the field to the north. Futher north you can see a forrest, but you can not see a viable path north from here. But you see a path leading east. The path is surrounded by bushes and trees. You can hear the sound of the ocean in the distance to the west. The sun is shining and the sky is blue with some white clouds and the birds are singing. The grass is swaying gently in the breeze. You feel a sense of calmness and peace.',
        image: 'summer4.png',
        exits: {
            south: { roomId: 'plains2', locked: false, description: 'a path leading south.', guardedBy: [], pathOpened: true },
            east: { roomId: 'plains6', locked: false, description: 'a path leading east.', guardedBy: [], pathOpened: true },
        },
        enemies: [
            {
                name: 'Rabbit', description: 'a fluffy white rabbit.', alive: true, health: 3, attack: 0, defense: 0, experience: 10, loot: [{ name: 'Rabbit meat', description: 'a piece of rabbit meat.', type: 'food', health: 5 }]
            },
            {
                name: 'Squrriel', description: 'a cute squrriel.', alive: true, health: 2, attack: 1, defense: 0, experience: 10
            },
        ],
    },
};

