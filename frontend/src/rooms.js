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
        image: 'start.webp',
        exits: {
            north: { roomId: 'plains8', locked: false, description: 'a path leading north.', guardedBy: [], pathOpened: true },
            south: { roomId: 'plains7', locked: false, description: 'a path leading south.', guardedBy: [], pathOpened: true },
            east: { roomId: 'plains10', locked: false, description: 'a path leading east.', guardedBy: [], pathOpened: true },
            west: { roomId: 'plains1', locked: false, description: 'a path leading west.', guardedBy: [], pathOpened: true },
        },
        enemies: [
            {
                name: 'Rabbits', description: 'a pack of fluffy rabbits.', alive: true, health: 5, attack: 0, defense: 0, experience: 10, loot: [{ name: 'Carrot', description: 'a crunchy carrot.', type: 'food', health: 5 }]
            },
            {
                name: 'Squrriel', description: 'a cute squrriel.', alive: true, health: 2, attack: 1, defense: 0, experience: 10, loot: [{ name: 'Acorn', description: 'a shiny acorn.', type: 'food', health: 3 }]
            },
        ],
        items: [
            { name: 'Flower', description: 'a beautiful flower.', pickup: true, type: 'food', health: 2 },
            { name: 'Stick', description: 'a sturdy stick.', pickup: true, type: 'weapon', attack: 1, equipped: false, bonusStats: [{ agility: 1 }] },
        ],
    },
    plains1: {
        description: 'You are on a field.',
        detailedDescription: 'You find yourself venturing deeper into the field. The sun shines brilliantly, casting a warm, golden glow over the landscape. A gentle breeze whispers through the air, carrying with it the melodic songs of distant birds. The scent of wildflowers mingles with the breeze, filling the air with a fragrant, heady perfume. The grass sways rhythmically, as if dancing to the unheard music of the wind, its gentle movements instilling a sense of peace and tranquility within you.<br>Suddenly, your senses sharpen as you detect a faint, rasping sound emanating from the nearby bushes. Could it be the elusive Nonnalids, the tiny flower people, hidden among the blossoms and leaves?',
        image: 'plains1.webp',
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
            { name: 'Flower', description: 'a beautiful flower.', pickup: true, type: 'food', health: 2 },
            { name: 'Stick', description: 'a sturdy stick.', pickup: true, type: 'weapon', attack: 1, equipped: false },
        ],
    },
    plains2: {
        description: 'You are on a field.',
        detailedDescription: 'You find yourself far out on the field to the west, where the landscape dramatically drops off into a sheer cliff. The cliff\'s edge looms ahead, its rugged face making it impossible to climb down.You\'ll need to find another way forward. Far below, you can hear the distant roar of the ocean, its rhythmic waves crashing against unseen shores.<br>The peacefulness and the breathtaking beauty of the surrounding nature compel you to pause and savor the moment. The sun casts a golden hue over the rolling fields, and a gentle breeze carries the scent of salt and wildflowers. As you take in the serene landscape, your eyes catch sight of something intriguing in the far distance to the south—a thin plume of smoke rising from what appears to be a chimney.',
        image: 'plains2.webp',
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
        detailedDescription: 'You follow the path south and find yourself in a small clearing. Before you stands a quaint house, its well- maintained appearance suggesting it has been lovingly cared for over the years.A small garden surrounds the house, vibrant with life—animals scurry about, and a variety of plants flourish in neat rows.<br>As you enter the garden, you notice a farmer diligently tending to her crops. She looks up and greets you with a warm smile, her friendly demeanor filling you with a sense of calm and peace. Close to the house, several pots brim with flowers in a dazzling array of colors, almost resembling a rainbow. You see vibrant orange, sunny yellow, lush green, deep blue, and rich indigo blooms. However, two pots remain empty, awaiting their turn to add to the spectrum.',
        image: 'plains3.webp',
        exits: {
            north: { roomId: 'plains2', locked: false, description: 'a path leading north.', guardedBy: [], pathOpened: true },
            east: { roomId: 'plains5', locked: false, description: 'a path leading east.', guardedBy: [], pathOpened: true },
        },
        items: [
            { name: 'Apple', description: 'a juicy red apple.', pickup: true, type: 'food', health: 5 },
            { name: 'Cabbage', description: 'a fresh cabbage.', pickup: true, type: 'food', health: 7 },
            { name: 'Water pouch', description: 'a pouch of water.', pickup: true, type: 'food', health: 3 },
            { name: 'Bread', description: 'a loaf of bread.', pickup: true, type: 'food', health: 7 },
        ],
        enemies: [
            {
                name: 'Farmer', description: 'a friendly farmer.', dialogue: 'Oh! Hello there young adventurer. TEST', alive: true, health: 15, attack: 1, defense: 1, experience: 100, loot: [{ name: 'Pitchfork', description: 'a rusty pitchfork.', type: 'weapon', attack: 2, equipped: false }]
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
        image: 'plains4.webp',
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
        image: 'plains5.webp',
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
        description: 'You are on a field.',
        detailedDescription: 'You find yourself far out in the northern field, staring at the forest ahead. The forest appears dark and dense, exuding an aura of danger and foreboding. There is no visible entry into the woods from here.<br>The distant sound of the ocean whispers from the west, its rhythmic waves barely perceptible. Though the sun shines brightly in a clear blue sky, dotted with a few white clouds, the birds\' songs have taken on a sorrowful tone, adding to the unsettling atmosphere.The grass sways gently in the breeze, but its soothing effect is overshadowed by the eerie howls of wolves and the sight of wild beasts prowling in the distance.<br>An uneasy feeling settles over you, heightening your senses as you take in the ominous scene.',
        image: 'plains6.webp',
        exits: {
            south: { roomId: 'plains1', locked: false, description: 'a path leading south.', guardedBy: ['Wolfs'], pathOpened: false },
            west: { roomId: 'plains4', locked: false, description: 'a path leading west.', guardedBy: ['Wolfs'], pathOpened: false },
            east: { roomId: 'plains8', locked: false, description: 'a path leading east.', guardedBy: ['Wolfs'], pathOpened: false },
        },
        enemies: [
            {
                name: 'Wolfs', description: 'two dangerous wolfs.', alive: true, health: 20, attack: 2, defense: 1, experience: 50, loot: [{ name: 'Wolf pelt', description: 'a wolf pelt.', type: 'armor', defense: 1, equipped: false }]
            },
        ],
    },
    plains7: {
        description: 'You are on a field.',
        detailedDescription: 'You find yourself far out in the southern field, where the vast expanse stretches out before you. To the south, a formidable mountain wall rises, blocking any passage in that direction. However, you notice paths leading east, north, and west, each surrounded by tall grass.<br>As you scan the area, you spot a small camp with two travelers nearby. They could be bandits, their presence adding a hint of tension to the otherwise serene scene. The sun shines brightly in a clear blue sky, adorned with a few fluffy white clouds. Birds sing melodiously, their tunes harmonizing with the gentle rustling of the grass swaying in the breeze.<br>Despite the tranquility of the environment, the presence of the travelers keeps you slightly on edge, a subtle reminder to stay vigilant.',
        image: 'plains7.webp',
        exits: {
            north: { roomId: 'start', locked: false, description: 'a path leading north.', guardedBy: [], pathOpened: true },
            east: { roomId: 'plains11', locked: false, description: 'a path leading east.', guardedBy: [], pathOpened: true },
            west: { roomId: 'plains5', locked: false, description: 'a path leading west.', guardedBy: [], pathOpened: true },
        },
        items: [
            { name: 'Red mushroom', description: 'a red mushroom.', pickup: true, type: 'food', health: -3 },
            { name: 'Brown mushroom', description: 'a brown mushroom.', pickup: true, type: 'food', health: 3 },
            { name: 'White mushroom', description: 'a white mushroom.', pickup: true, type: 'food', health: 3 },
        ],
        enemies: [
            {
                name: 'Travelers', description: 'two shady looking travelers.', alive: true, health: 30, attack: 1, defense: 1, experience: 100, loot: [{ name: 'Dagger', description: 'a rusty dagger.', type: 'weapon', attack: 1, equipped: false, bonusStats: [{ agility: 1 }] }, { name: 'Short Sword', description: 'a rusty short sword.', type: 'weapon', attack: 2, equipped: false }]
            },
        ],
    },
    plains8: {
        description: 'You are on a field.',
        detailedDescription: 'You have reached the end of the field. Before you lies a forest, dark and dense, exuding an aura of danger and mystery. The only visible entry into the woods stands before you, a narrow, shadowy path that seems to beckon yet warn at the same time.<br>In the distance to the north, you hear the haunting howls of wolves, their cries echoing through the heavy atmosphere. The sense of unease grows stronger, weighing down on you as you contemplate your next move.<br>You must decide: Do you dare to venture into the foreboding forest, braving the unknown perils that lie ahead? Or do you turn back, returning to the relative safety of the field?',
        image: 'plains8.webp',
        exits: {
            south: { roomId: 'start', locked: false, description: 'a path leading south.', guardedBy: [], pathOpened: true },
            north: { roomId: 'plainsBoss', locked: false, description: 'a path leading north.', guardedBy: [], pathOpened: true },
            west: { roomId: 'plains6', locked: false, description: 'a path leading west.', guardedBy: [], pathOpened: true },
            east: { roomId: 'plains9', locked: false, description: 'a path leading east.', guardedBy: [], pathOpened: true },
        },
        enemies: [
            {
                name: 'Foxes', description: 'two small red foxes.', alive: true, health: 15, attack: 1, defense: 1, experience: 20, loot: [{ name: 'Fox fur', description: 'a fox fur.', type: 'armor', defense: 1, equipped: false }]
            },
        ],
    },
    plains9: {
        description: 'You are on a field.',
        detailedDescription: 'You find yourself far to the north, out on the open field. Ahead of you lies a forest, its dark and twisted trees forming an impenetrable barrier with no visible path leading inside. The forest exudes an eerie, unsettling aura, filling you with a deep sense of dread.<br>From the east, you hear faint voices carried on the wind, and see smoke rising from what appears to be a campfire far away in the distance. Perhaps this is where the travelers you encountered to the south came from. The sense of unease intensifies as you realize you might not be alone.<br>Every rustle of the grass, every whisper of the wind, makes you feel like you are being watched. Your senses are heightened, and you find yourself on edge, uncertain of what might be lurking just out of sight.',
        image: 'plains9.webp',
        exits: {
            south: { roomId: 'plains10', locked: false, description: 'a path leading south.', guardedBy: [], pathOpened: true },
            west: { roomId: 'plains8', locked: false, description: 'a path leading west.', guardedBy: [], pathOpened: true },
            east: { roomId: 'plains14', locked: false, description: 'a path leading east.', guardedBy: [], pathOpened: true },
        },
        items: [
            { name: 'Mushroom', description: 'a red mushroom, usually not safe to eat.', pickup: true, type: 'food', health: -3 },
            { name: 'Mushroom', description: 'a brown mushroom.', pickup: true, type: 'food', health: 3 },
            { name: 'Mushroom', description: 'a white mushroom.', pickup: true, type: 'food', health: 3 },
        ],
        enemies: [
            {
                name: 'Wolves', description: 'two big grey wolves', alive: true, health: 25, attack: 3, defense: 1, experience: 50, loot: [{ name: 'Wolf pelt', description: 'a wolf pelt.', type: 'armor', defense: 1, equipped: false }]
            },
        ],
    },
    plains10: {
        description: 'You are on a field.',
        detailedDescription: 'You find yourself far to the east, out on the open field. The wind is blowing from the east, carrying the salty scent of the sea. In the distance, you can hear the rhythmic sound of the ocean\'s waves crashing against the shore.<br>Before you, a clear path stretches out, leading north, south, and further east. As you stand there, you catch the faint sound of quiet conversation uttering words of a dire need of "wolf pelt", coming from the ground. Looking closer, you realize you have stumbled upon a Nonnalid village, home to the tiny flower people. They move about, their delicate forms blending with the vibrant flowers around them.<br>The Nonnalids are harmless, their presence adding a touch of magic to the landscape. The proximity of the ocean feels tangible now, the salty breeze and distant waves assuring you that you are drawing nearer to the coast.',
        image: 'plains10.webp',
        exits: {
            north: { roomId: 'plains9', locked: false, description: 'a path leading north.', guardedBy: [], pathOpened: true },
            south: { roomId: 'plains11', locked: false, description: 'a path leading south.', guardedBy: [], pathOpened: true },
            east: { roomId: 'plains13', locked: false, description: 'a path leading east.', guardedBy: [], pathOpened: true },
            west: { roomId: 'start', locked: false, description: 'a path leading west.', guardedBy: [], pathOpened: true },
        },
        enemies: [
            {
                name: "Nonnalids", description: "the whole village of Nonnalids.", alive: true, health: 100, attack: 2, defense: 1, experience: -100, loot: [{ name: 'Grand flower', description: 'beautiful magic flower.', type: 'food', health: 30 }]
            },
            {
                name: "Chief Nonnalid", description: "a chief Nonnalid whoms responsability is to take care and rule over a Nonnalid village.", alive: true, health: 20, attack: 2, defense: 4, experience: 50, loot: [{ name: 'Red flower', description: 'beautiful red flower.', type: 'food', health: 2 }]
            },
        ],
        items: [
            { name: 'Flower', description: 'beautiful flower.', pickup: true, type: 'food', health: 2 },
            { name: 'Stick', description: 'sturdy stick.', pickup: true, type: 'weapon', attack: 1, equipped: false },
            { name: 'Water pouch', description: 'a pouch of water.', pickup: true, type: 'food', health: 3 },
        ],
        interactions: {
            'wolf pelt': {
                message: 'You present the wolf pelt to the Nonnalid chief. The chief smiles and giggles, his delicate form quivering with delight. "This wolf pelt will keep everyone in the village warm during the cold seasons," he tells you gratefully. "For this generous gift, I shall give you something in return."<br>The chief\'s expression becomes more serious as he shares a secret with you. "To the north, there is a cave that holds a treasure. But to enter, you must speak a secret phrase." Leaning closer, he whispers, "The phrase is: \'The moon is shining bright tonight.\'"',
                consume: true, // Whether the item should be removed from the inventory after use
            },
        },
    },
    plains11: {
        description: 'You are on a field.',
        detailedDescription: 'You find yourself far to the south, out on the expansive field. The field stretches out before you, ending at a towering mountain wall to the south. There is no visible path leading through the mountains from here. However, you see paths branching off to the east, north, and west, each bordered by tall, gently swaying grass.<br>Nothing in particular catches your attention in the immediate vicinity. The sun is shining brightly, casting a warm glow over the landscape, while the sky remains a clear blue, dotted with a few fluffy white clouds. Birds are singing sweetly, their melodies blending with the soft rustling of the grass in the breeze. The scene is peaceful, filling you with a sense of calm.',
        image: 'plains11.webp',
        exits: {
            north: { roomId: 'plains10', locked: false, description: 'a path leading north.', guardedBy: [], pathOpened: true },
            east: { roomId: 'plains12', locked: false, description: 'a path leading east.', guardedBy: [], pathOpened: true },
            west: { roomId: 'plains7', locked: false, description: 'a path leading west.', guardedBy: [], pathOpened: true },
        },
    },
    plains12: {
        description: 'You are on a field.',
        detailedDescription: 'You find yourself as far southeast as you can go. A path stretches out ahead, leading north. To the east, the ocean crashes against the cliffs far below, its rhythmic sound echoing through the air. Your eyes catch a glimpse of a cave in the mountain wall, partially obscured by shadows. What could this cave be? A sense of curiosity and wonder stirs within you.<br>As you contemplate the cave, a low growling sound emanates from its depths, unmistakably the rumble of a bear. Should you go and investigate the cave, drawn by the promise of discovery, or heed the warning growls and proceed with caution?',
        image: 'plains12.webp',
        exits: {
            north: { roomId: 'plains13', locked: false, description: 'a path leading north.', guardedBy: [], pathOpened: true },
            west: { roomId: 'plains11', locked: false, description: 'a path leading west.', guardedBy: [], pathOpened: true },
            south: { roomId: 'bearCave', locked: false, description: 'a path leading south.', guardedBy: [], pathOpened: true },
        },
    },
    plains13: {
        description: 'You are on a field.',
        detailedDescription: 'You have wandered far to the east. Below the cliffs to the east, the ocean stretches out, its waves crashing against the rocky shore, filling the air with the soothing sound of the sea. A clear path lies before you, offering routes to the south, west, and north.<br>To the north, you notice a campfire and hear faint voices drifting on the breeze. Could this be a travelers\' camp? The sight fills you with a mix of calm and relaxation, soothed by the natural beauty around you, yet tinged with nervousness about the unknown travelers.',
        image: 'plains13.webp',
        exits: {
            north: { roomId: 'plains14', locked: false, description: 'a path leading north.', guardedBy: [], pathOpened: true },
            west: { roomId: 'plains10', locked: false, description: 'a path leading west.', guardedBy: [], pathOpened: true },
            south: { roomId: 'plains12', locked: false, description: 'a path leading south.', guardedBy: [], pathOpened: true },
        },
        enemies: [
            {
                name: 'Rabbits', description: 'pack of fluffy white rabbits.', alive: true, health: 6, attack: 0, defense: 0, experience: 20, loot: [{ name: 'Rabbit meat', description: 'a piece of rabbit meat.', type: 'food', health: 5 }]
            },
        ],
        items: [
            { name: 'Berries', description: 'a bunch of berries.', pickup: true, type: 'food', health: 5 },
        ],
    },
    plains14: {
        description: 'You are on a field.',
        detailedDescription: 'You find yourself in the far northeast, where the field meets the ocean. The waves crash against the cliffs below, filling the air with the soothing melody of the sea. A path stretches out before you, leading south and west.<br>As you stand there, you notice a camp close by, its flickering flames casting a warm glow over the area. The sound of voices drifts on the breeze, carried from the campfire. The presence of travelers adds a sense of mystery and intrigue to the serene landscape, but something about their hushed tones and wary glances makes you uneasy. These travelers might not be friendly, reminding you that you must stay vigilant in this vast world.',
        image: 'plains14.webp',
        exits: {
            south: { roomId: 'plains13', locked: false, description: 'a path leading south.', guardedBy: [], pathOpened: true },
            west: { roomId: 'plains9', locked: false, description: 'a path leading west.', guardedBy: [], pathOpened: true },
        },
        items: [
            { name: 'Berries', description: 'a bunch of berries.', pickup: true, type: 'food', health: 5 },
        ],
        enemies: [
            {
                name: 'Travelers', description: 'a few travelers.', alive: true, health: 80, attack: 15, defense: 3, experience: 400, loot: [{ name: 'Sharp dagger', description: 'a sharp dagger.', type: 'weapon', attack: 3, equipped: false, bonusStats: [{ agility: 2 }] }, { name: 'Longsword', description: 'a sharp longsword.', type: 'weapon', attack: 6, equipped: false, bonusStats: [{ strength: 2 }] }, { name: 'Leather armor', description: 'sturdy set of leather armor.', type: 'armor', defense: 3, equipped: false }, { name: 'Healing potion', description: 'a healing potion.', type: 'food', health: 25 }]
            },
        ],
        interactions: {
            'bear claw': {
                message: 'You show the bear claw to the travelers. They gasp in surprise and awe, recognizing the mark of the bear that guards the cave to the south. "You have faced the bear and emerged victorious," one of the travelers exclaims. "For this brave deed, we shall reward you with something special. Take this as a token of our gratitude. The key should fit a treasure chest hidden in the cave."',
                consume: true, // Whether the item should be removed from the inventory after use
                reward: [{ name: 'Longsword', description: 'a sharp longsword.', type: 'weapon', attack: 6, equipped: false, bonusStats: [{ strength: 2 }] }, { name: 'Leather armor', description: 'sturdy set of leather armor.', type: 'armor', defense: 3, equipped: false }, { name: 'treasure key', description: 'a key to a treasure chest.', type: 'key' }]
            },
        },
    },
    bearCave: {
        description: 'You are at the entrance of a cave.',
        detailedDescription: 'You stand at the entrance of a dark and foreboding cave. The air is cool and damp, the scent of earth and moss filling your nostrils. The cave\'s mouth yawns wide before you, its depths shrouded in shadow. A low growling sound emanates from within, unmistakably the rumble of a bear.<br>Do you dare to enter the cave, braving the unknown dangers that lie within? Or do you heed the warning growls and retreat to the safety of the open field?',
        image: 'outsideCave.webp',
        enemyImage: 'caveBear.webp',
        exits: {
            north: { roomId: 'plains12', locked: false, description: 'a path leading north.', guardedBy: [], pathOpened: true },
            south: { roomId: 'bearCaveInterior', locked: false, description: 'a path leading south.', guardedBy: ['Bear'], pathOpened: false },
        },
        enemies: [
            {
                name: 'Bear', description: 'a large and fierce bear.', alive: true, health: 50, attack: 5, defense: 2, experience: 100, loot: [{ name: 'Bear claw', description: 'a sharp bear claw.', type: 'weapon', attack: 4, equipped: false }, { name: 'Bear fur', description: 'a bear fur.', type: 'armor', defense: 2, equipped: false }]
            },
        ],
    },
    bearCaveInterior: {
        description: 'You are inside a cave.',
        detailedDescription: 'You find yourself inside the dark and cavernous cave. The air is cool and musty, the scent of earth and dampness clinging to your skin. The cave walls are rough and uneven, their surfaces slick with moisture. The dim light filtering in from the entrance casts eerie shadows that dance and flicker across the stone.<br>As you cautiously move deeper into the cave, the growling sound grows louder, reverberating off the walls. You know that the bear is close, its presence a looming threat in the darkness. The cave stretches out before you, its twists and turns hiding untold dangers within.<br>Do you press on, determined to face the bear and claim the treasure rumored to be hidden within the cave? Or do you retreat, unwilling to risk your life in pursuit of uncertain rewards?',
        image: 'bearCaveInterior.webp',
        enemyImage: 'caveBearBoss.webp',
        exits: {
            north: { roomId: 'bearCave', locked: false, description: 'a path leading north.', guardedBy: ['Grizzly'], pathOpened: true },
        },
        items: [
            { name: 'Treasure chest', description: 'ornate treasure chest.', pickup: false, type: 'container', locked: true, guardedBy: ['Grizzly'] },
        ],
        enemies: [
            {
                name: 'Grizzly', description: 'a large and fierce grizzly.', alive: true, health: 100, attack: 5, defense: 2, experience: 200, loot: [{ name: 'Grizzly claw', description: 'a giant sharp bear claw.', type: 'weapon', attack: 6, equipped: false }, { name: 'Grizzly fur', description: 'a bear fur.', type: 'armor', defense: 5, equipped: false }]
            },
        ],
        // Fix so that interactions are giving you a reward into your inventory. and fix so that an item can be guarded by enemies.
        interactions: {
            'treasure key': {
                unlocks: 'Treasure chest',
                message: 'You use the treasure key to unlock the treasure chest. Inside, you find a gleaming golden amulet, its intricate design catching the dim light and casting shimmering reflections across the cave walls. The amulet feels warm to the touch, pulsing with a faint magical energy. As you slip it around your neck, you feel a surge of power and protection wash over you.',
                consume: true, // Whether the item should be removed from the inventory after use
                reward: [{ name: 'Golden amulet', description: 'magical golden amulet.', type: 'armor', defense: 5, equipped: true }]
            },
        },
    },
    plainsBoss: {
        description: 'You are in the enterence of a forest.',
        detailedDescription: 'You try to enter the forest and you emediatly encounter a lurking bandit blocking your path.He does not look friendly, and you can see that he is ready to fight.',
        image: 'plainsBoss.webp',
        enemyImage: 'lurkingBandit.webp',


    },


};

// Maybe changing setup with multiple enemies as just one object with multiple enemies OR just one array with an object with enemy with multiple stats, making looting etc easier to handle. FOR NOW: array with objects. have not tested but perhaps looting is not working as intended. with multiple enemies with the same name. TEST THIS!

