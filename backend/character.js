let player = {
    name: 'Bob',
    life: 100,
    attack: 10,
    defend: 5,
    speed: 5,
    level: 1,
    experience: 0,
    nextLevel: 100,
    inventory: [],
    equip: [],
    skills: [],
    quests: [],
}

let playerPromise = Promise.resolve(player);

export default playerPromise;