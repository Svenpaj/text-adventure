import playerPromise from './character.js';
import items from "./JSON/items.json" with { type: "json" };
import * as fs from 'node:fs';

async function game() {
    let player = await playerPromise;
    console.log(player);
    console.log(items);
    player.inventory.push(items[0]);
    console.log(player);
}

game();