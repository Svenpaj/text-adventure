import playerPromise from "../character.js";
import items from "../JSON/items.json" with { type: "json" };

// Test item
let testItem = items[0];

console.log(testItem);

// Function to add item to inventory

export default async function addToInventory(item) {
    let player = await playerPromise;
    player.inventory.push(item);
    console.log(player);
    return player;
}

// Testing function
addToInventory(testItem);
addToInventory(testItem);