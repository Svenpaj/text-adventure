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

    start: {
        description: 'You are on a field.',
        detailedDescription: 'As you begin your journey, you find yourself in a wide, open field. The sun is shining brightly, casting a warm, inviting light over the landscape. Birds sing melodiously from unseen perches, their songs harmonizing with the gentle rustle of the grass swaying in the breeze. A vibrant tapestry of flowers spreads out around you, their colors vivid and their scent sweet in the air. Amidst the floral display, rabbits and squirrels hop and scurry about, adding a touch of lively charm to the serene scene.',
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
            { name: 'Stick', description: 'sturdy stick.', type: 'weapon', attack: 1, equipped: false, bonusStats: [{ agility: 1 }] },
        ],
    },
    plains1: {
        description: 'You are on a field.',
        detailedDescription: 'You find yourself venturing deeper into the field. The sun shines brilliantly, casting a warm, golden glow over the landscape. A gentle breeze whispers through the air, carrying with it the melodic songs of distant birds. The scent of wildflowers mingles with the breeze, filling the air with a fragrant, heady perfume. The grass sways rhythmically, as if dancing to the unheard music of the wind, its gentle movements instilling a sense of peace and tranquility within you.<br>Suddenly, your senses sharpen as you detect a faint, rasping sound emanating from the nearby bushes. Could it be the elusive Nonnalids, the tiny flower people, hidden among the blossoms and leaves?',
        image: 'summer5.png',
        exits: {
            north: { roomId: 'plains6', locked: false, description: 'a path leading north.', guardedBy: [], pathOpened: true },
            south: { roomId: 'plains5', locked: false, description: 'a path leading south.', guardedBy: [], pathOpened: true },
            west: { roomId: 'plains2', locked: false, description: 'a path leading west.', guardedBy: [], pathOpened: true },
            east: { roomId: 'start', locked: false, description: 'a path leading east.', guardedBy: [], pathOpened: true },
        },
        enemies: [
            {
                name: 'Rabbit', description: 'a fluffy white rabbit.', alive: true, health: 3, attack: 0, defense: 0, experience: 10, loot: [{ name: 'Carrot', description: 'a crunchy carrot.', type: 'food', health: 5 }]
            },
            {
                name: 'Squrriel', description: 'a cute squrriel.', alive: true, health: 2, attack: 1, defense: 0, experience: 10, loot: [{ name: 'Acorn', description: 'a shiny acorn.', type: 'food', health: 3 }]
            },
            {
                name: "Nonnalid", description: "a small peaceful creature that's commonly called 'Flower people'.", alive: true, health: 5, attack: 1, defense: 1, experience: 20, loot: [{ name: 'Purple flower', description: 'beautiful purple flower.', type: 'food', health: 2 }]
            },
        ],
        items: [
            { name: 'Flower', description: 'beautiful flower.', type: 'food', health: 2 },
            { name: 'Stick', description: 'sturdy stick.', type: 'weapon', attack: 1, equipped: false },
        ],
    },
    plains2: {
        description: 'You are on a field.',
        detailedDescription: 'You find yourself far out on the field to the west, where the landscape dramatically drops off into a sheer cliff. The cliff\'s edge looms ahead, its rugged face making it impossible to climb down.You\'ll need to find another way forward. Far below, you can hear the distant roar of the ocean, its rhythmic waves crashing against unseen shores.<br>The peacefulness and the breathtaking beauty of the surrounding nature compel you to pause and savor the moment. The sun casts a golden hue over the rolling fields, and a gentle breeze carries the scent of salt and wildflowers. As you take in the serene landscape, your eyes catch sight of something intriguing in the far distance to the south—a thin plume of smoke rising from what appears to be a chimney.',
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
        detailedDescription: 'You follow the path south and find yourself in a small clearing.Before you stands a quaint house, its well- maintained appearance suggesting it has been lovingly cared for over the years.A small garden surrounds the house, vibrant with life—animals scurry about, and a variety of plants flourish in neat rows.<br>As you enter the garden, you notice a farmer diligently tending to her crops. She looks up and greets you with a warm smile, her friendly demeanor filling you with a sense of calm and peace. Close to the house, several pots brim with flowers in a dazzling array of colors, almost resembling a rainbow. You see vibrant orange, sunny yellow, lush green, deep blue, and rich indigo blooms. However, two pots remain empty, awaiting their turn to add to the spectrum.',
        image: 'summer1.png',
        exits: {
            north: { roomId: 'plains2', locked: false, description: 'a path leading north.', guardedBy: [], pathOpened: true },
            east: { roomId: 'plains5', locked: false, description: 'a path leading east.', guardedBy: [], pathOpened: true },
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
                message: 'You hand the purple flower to the farmer. She smiles and giggles with delight, her eyes sparkling as she admires the blossom. "I adore purple flowers," she tells you warmly, "and for this lovely gift, I shall give you something in return."<br>Leaning in close, the farmer whispers in your ear, "When you reach the forest, go as far as you can to the east. There, you will find a cave. Inside the cave lies a treasure. To enter the cave, you must speak a secret phrase. I do not know this phrase, but perhaps you will acquire such knowledge on your journey. But be careful—the cave is guarded by a big bear. However, I believe you have the strength to handle it."',
                consume: true, // Whether the item should be removed from the inventory after use
            },
            'red flower': {
                message: 'You hand the red flower to the farmer. She smiles and giggles with delight, her eyes twinkling as she cradles the blossom. "I adore red flowers," she tells you warmly, "and for this lovely gift, I shall give you something in return."<br>The farmer begins to recount an old tale. "Once, there was a man who was a great warrior, but his life took a dark turn when a witch cursed him, transforming him into a fearsome werewolf. This half-man, half-wolf creature began to terrorize our village, spreading fear and chaos.<br>"One day, a young girl from the village found herself face-to-face with the beast. Despite her fear, she defended herself with the only weapon she had—a silver spoon. Miraculously, she managed to escape, and the tale of her bravery became legend."',
                consume: true, // Whether the item should be removed from the inventory after use
            },
        },
    },
    plains4: {
        description: 'You are on a field.',
        detailedDescription: 'You find yourself far out in the northern field. To the north, a dense forest looms, but no viable path leads directly through it from here. However, you notice a path winding eastward, flanked by bushes and trees. The distant sound of the ocean whispers from the west, its rhythmic waves adding to the serene atmosphere.<br>The sun shines brightly in a clear blue sky, dotted with a few fluffy white clouds. Birds sing melodiously, their songs blending harmoniously with the gentle rustling of the grass swaying in the breeze. The tranquility of the scene fills you with a deep sense of calmness and peace.',
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
    plains5: {
        description: 'You are on a field.',
        detailedDescription: 'You find yourself far out in the southern field, where the vast expanse stretches out before you. To the south, a formidable mountain wall rises, offering no visible path forward. However, you notice paths leading both west and north, their borders lined with dense bushes.<br>The distant sound of the ocean whispers from the west, mingling with the sight of smoke curling from a distant chimney. The sun shines brightly in a clear blue sky, adorned with a few fluffy white clouds. Birds sing melodiously, their tunes harmonizing with the gentle rustling of the grass swaying in the breeze. The tranquil scene fills you with a deep sense of calmness and peace.',
        image: 'summer3.png',
        exits: {
            north: { roomId: 'plains1', locked: false, description: 'a path leading north.', guardedBy: [], pathOpened: true },
            east: { roomId: 'plains7', locked: false, description: 'a path leading east.', guardedBy: [], pathOpened: true },
            west: { roomId: 'plains3', locked: false, description: 'a path leading west.', guardedBy: ['Snake'], pathOpened: false },
        },
        enemies: [
            {
                name: 'Snake', description: 'a small black snake.', alive: true, health: 3, attack: 0, defense: 0, experience: 10
            },
            {
                name: 'Squrriel', description: 'a cute squrriel.', alive: true, health: 2, attack: 1, defense: 0, experience: 10
            },
        ],
    },
    plains6: {
        // This is where I am on rewriting the rooms and narrative, and dont forget to change the enemies and items to better work with the code. also check so that the code is working with new changes to the rooms and items.
        description: 'You are on a field.',
        detailedDescription: 'You find yourself far out to the north on the field. You see a forrest infront of you. The forrest looks dark and dense, and most of all..dangerous. There is no visable entry into the woods from here. You can hear the sound of the ocean in the distance to the west. The sun is shining and the sky is blue with some white clouds, the birds a singing in a more sorrow mannor then before. The grass is swaying gently in the breeze. You hear wolfs howling, and can see wild beasts moving around in the distance. You feel uneasy.',
        image: 'summer4.png',
        exits: {
            south: { roomId: 'plains1', locked: false, description: 'a path leading south.', guardedBy: ['Wolf'], pathOpened: false },
            west: { roomId: 'plains4', locked: false, description: 'a path leading west.', guardedBy: ['Wolf'], pathOpened: false },
            east: { roomId: 'plains8', locked: false, description: 'a path leading east.', guardedBy: ['Wolf'], pathOpened: false },
        },
        enemies: [
            {
                name: 'Wolf', description: 'a big grey wolf.', alive: true, health: 10, attack: 2, defense: 1, experience: 50
            },
            {
                name: 'Wolf', description: 'a big grey wolf.', alive: true, health: 10, attack: 2, defense: 1, experience: 50, loot: [{ name: 'Wolf pelt', description: 'a wolf pelt.', type: 'armor', defense: 1, equipped: false }]
            },
        ],
    },
    plains7: {
        description: 'You are on a field.',
        detailedDescription: 'You find yourself far out to the south on the field. You see the the field stretches out infront of you. There is an mountain wall to the south. You can not see a path leading south from here. But you see paths leading both east, north and west. The paths are surrounded by tall grass. You notice a small camp with two travelers, they could be bandits. The sun is shining and the sky is blue with some white clouds and the birds are singing. The grass is swaying gently in the breeze. You feel calm, but still a little on edge due to the travelers camping nearby.',
        image: 'summer3.png',
        exits: {
            north: { roomId: 'start', locked: false, description: 'a path leading north.', guardedBy: [], pathOpened: true },
            east: { roomId: 'plains11', locked: false, description: 'a path leading east.', guardedBy: [], pathOpened: true },
            west: { roomId: 'plains5', locked: false, description: 'a path leading west.', guardedBy: [], pathOpened: true },
        },
        items: [
            { name: 'Mushroom', description: 'a red mushroom, usually not safe to eat.', type: 'food', health: -3 },
            { name: 'Mushroom', description: 'a brown mushroom.', type: 'food', health: 3 },
            { name: 'Mushroom', description: 'a white mushroom.', type: 'food', health: 3 },
        ],
        enemies: [
            {
                name: 'Bandit', description: 'a shady looking bandit.', alive: true, health: 15, attack: 2, defense: 1, experience: 100, loot: [{ name: 'Short Sword', description: 'a rusty short sword.', type: 'weapon', attack: 2, equipped: false }]
            },
            {
                name: 'Bandit', description: 'a shady looking bandit.', alive: true, health: 15, attack: 1, defense: 1, experience: 100, loot: [{ name: 'Dagger', description: 'a rusty dagger.', type: 'weapon', attack: 1, equipped: false, bonusStats: [{ agility: 1 }] }]
            },
        ],
    },
    plains8: {
        description: 'You are on a field.',
        detailedDescription: 'You have reach the end of the field. You see a forrest infront of you. The forrest looks dark and dense, and most of all..dangerous. There is first visable entry into the woods that you have found. You hear wolfs howling in the distance to the north. The atmosphere is heavy and you feel uneasy. You need to think about your next move. Do you go into the woods and venture further into the unknown, or do you turn back and go back to the field?',
        image: 'summer4.png',
        exits: {
            south: { roomId: 'start', locked: false, description: 'a path leading south.', guardedBy: [], pathOpened: true },
            north: { roomId: 'plainsBoss', locked: false, description: 'a path leading north.', guardedBy: [], pathOpened: true },
            west: { roomId: 'plains6', locked: false, description: 'a path leading west.', guardedBy: [], pathOpened: true },
            east: { roomId: 'plains9', locked: false, description: 'a path leading east.', guardedBy: [], pathOpened: true },
        },
        enemies: [
            {
                name: 'Fox', description: 'a small red fox.', alive: true, health: 5, attack: 1, defense: 1, experience: 20, loot: [{ name: 'Fox fur', description: 'a fox fur.', type: 'armor', defense: 1, equipped: false }]
            },
            {
                name: 'Fox', description: 'a small red fox.', alive: true, health: 5, attack: 1, defense: 1, experience: 20, loot: [{ name: 'Fox fur', description: 'a fox fur.', type: 'armor', defense: 1, equipped: false }]
            },
        ],
    },
    plains9: {
        description: 'You are on a field.',
        detailedDescription: 'You find yourself far to the north out on the field. You can see a forrest infront of you but there is no path leading into the woods from here. The forrest feels eerie and you feel a sense of dread. You can hear faint voices in the distance to the east, and smoke rising from a campfire. Maybe this is the place where the travelers from the south came from. You feel uneasy and on edge. You feel like you are being watched.',
        image: 'summer4.png',
        exits: {
            south: { roomId: 'plains10', locked: false, description: 'a path leading south.', guardedBy: [], pathOpened: true },
            west: { roomId: 'plains8', locked: false, description: 'a path leading west.', guardedBy: [], pathOpened: true },
            east: { roomId: 'plains14', locked: false, description: 'a path leading east.', guardedBy: [], pathOpened: true },
        },
        items: [
            { name: 'Mushroom', description: 'a red mushroom, usually not safe to eat.', type: 'food', health: -3 },
            { name: 'Mushroom', description: 'a brown mushroom.', type: 'food', health: 3 },
            { name: 'Mushroom', description: 'a white mushroom.', type: 'food', health: 3 },
        ],
        enemies: [
            {
                name: 'Wolf', description: 'a big grey wolf.', alive: true, health: 10, attack: 2, defense: 1, experience: 50
            },
            {
                name: 'Wolf', description: 'a big grey wolf.', alive: true, health: 10, attack: 2, defense: 1, experience: 50, loot: [{ name: 'Wolf pelt', description: 'a wolf pelt.', type: 'armor', defense: 1, equipped: false }]
            },
        ],
    },
    plains10: {
        description: 'You are on a field.',
        detailedDescription: 'You find yourself far to the east out on the field. The wind is blowing from the east and you can smell the salty sea. You can hear the sound of the ocean in the distance. You see a path leading north, south and east. The path is clear. You can hear something talking quietly, it is coming from the ground. And you notice that you have stumbled upon a Nonnalid village. These are tiny flower people. They are harmless. You feel like you are getting closer to the ocean.',
        image: 'summer4.png',
        exits: {
            north: { roomId: 'plains9', locked: false, description: 'a path leading north.', guardedBy: [], pathOpened: true },
            south: { roomId: 'plains11', locked: false, description: 'a path leading south.', guardedBy: [], pathOpened: true },
            east: { roomId: 'plains13', locked: false, description: 'a path leading east.', guardedBy: [], pathOpened: true },
            west: { roomId: 'start', locked: false, description: 'a path leading west.', guardedBy: [], pathOpened: true },
        },
        enemies: [
            {
                name: "Nonnalid", description: "a small peaceful creature that's commonly called 'Flower people'.", alive: true, health: 5, attack: 1, defense: 1, experience: 20, loot: [{ name: 'Flower', description: 'beautiful flower.', type: 'food', health: 2 }]
            },
            {
                name: "Nonnalid", description: "a small peaceful creature that's commonly called 'Flower people'.", alive: true, health: 5, attack: 1, defense: 1, experience: 20, loot: [{ name: 'Flower', description: 'beautiful flower.', type: 'food', health: 2 }]
            },
            {
                name: "Nonnalid", description: "a small peaceful creature that's commonly called 'Flower people'.", alive: true, health: 5, attack: 1, defense: 1, experience: 20, loot: [{ name: 'Flower', description: 'beautiful flower.', type: 'food', health: 2 }]
            },
            {
                name: "Chief Nonnalid", description: "a chief Nonnalid whoms responsability is to take care and rule over a Nonnalid village.", alive: true, health: 20, attack: 2, defense: 4, experience: 50, loot: [{ name: 'Red flower', description: 'beautiful red flower.', type: 'food', health: 2 }]
            },
        ],
        items: [
            { name: 'Flower', description: 'beautiful flower.', type: 'food', health: 2 },
            { name: 'Stick', description: 'sturdy stick.', type: 'weapon', attack: 1, equipped: false },
            { name: 'Water pouch', description: 'a pouch of water.', type: 'food', health: 3 },
        ],
        interactions: {
            'wolf pelt': {
                message: 'You give the wolf pelt to the Nonnalid chief. The chief smiles and giggles. He tells you that wolf pelt is used to keep everybody in the village warm during the cold seasons. He tells you that he will give you a gift in return. <br> The chief proceeds to tell you about a cave that is located to the north. In the cave you will find a treasure. But to be able to enter the cave you need to speak a secret phrase. The chief knows this phrase, and he tells you that the phrase is: "The moon is shining bright tonight".',
                consume: true, // Whether the item should be removed from the inventory after use
            },
        },
    },
    plains11: {
        description: 'You are on a field.',
        detailedDescription: 'You find yourself far to the south out on the field. You see the the field stretches out infront of you. There is an mountain wall to the south. You can not see a path leading south from here. But you see paths leading both east, north and west. The paths are surrounded by tall grass. You do not see anything that catches your attention. The sun is shining and the sky is blue with some white clouds and the birds are singing. The grass is swaying gently in the breeze. You feel calm.',
        image: 'summer3.png',
        exits: {
            north: { roomId: 'plains10', locked: false, description: 'a path leading north.', guardedBy: [], pathOpened: true },
            east: { roomId: 'plains12', locked: false, description: 'a path leading east.', guardedBy: [], pathOpened: true },
            west: { roomId: 'plains7', locked: false, description: 'a path leading west.', guardedBy: [], pathOpened: true },
        },
    },
    plains12: {
        description: 'You are on a field.',
        detailedDescription: 'You find as far to southeast that you can go. There is a path forward leading north. You can see the ocean beneath the cliffs further to the east. Your eyes catches a glimpse of a cave in the mountain wall. What could this cave be? You feel a sense of curiosity and wonder. You can hear a growling sound coming from the cave, It almost sounds like a bear. Should you go and investigate the cave?',
        image: 'summer2.png',
        exits: {
            north: { roomId: 'plains13', locked: false, description: 'a path leading north.', guardedBy: [], pathOpened: true },
            west: { roomId: 'plains11', locked: false, description: 'a path leading west.', guardedBy: [], pathOpened: true },
            south: { roomId: 'bearCave', locked: false, description: 'a path leading south.', guardedBy: [], pathOpened: true },
        },
    },
    plains13: {
        description: 'You are on a field.',
        detailedDescription: 'You have wondered far to the east. You can see the ocean beneath the cliffs further to the east. You can hear the sound of the ocean. You can see a path leading south, west and north. The path is clear. To the north you also notice a campfire and faint voices, could this be a travelers camp? You feel calm and relaxed but also nervous about the travelers.',
        image: 'summer2.png',
        exits: {
            north: { roomId: 'plains14', locked: false, description: 'a path leading north.', guardedBy: [], pathOpened: true },
            west: { roomId: 'plains10', locked: false, description: 'a path leading west.', guardedBy: [], pathOpened: true },
            south: { roomId: 'plains12', locked: false, description: 'a path leading south.', guardedBy: [], pathOpened: true },
        },
        enemies: [
            {
                name: 'Rabbit', description: 'a fluffy white rabbit.', alive: true, health: 3, attack: 0, defense: 0, experience: 10
            },
            {
                name: 'Rabbit', description: 'a fluffy white rabbit.', alive: true, health: 3, attack: 0, defense: 0, experience: 10
            },
        ],
        items: [
            { name: 'Berries', description: 'a bunch of berries.', type: 'food', health: 5 },
        ],
    },

    // Maybe changing setup with multiple enemies as just one object with multiple enemies OR just one array with an object with enemy with multiple stats, making looting etc easier to handle. FOR NOW: array with objects. have not tested but perhaps looting is not working as intended. with multiple enemies with the same name. TEST THIS!

};

