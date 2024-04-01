import playerPromise from "../character.js";
import items from "../JSON/items.json" with { type: "json" };

let testItem = items[0];

console.log(testItem);

export default async function equipItem(item) {
    let player = await playerPromise;
    let itemIndex = player.inventory.indexOf(item);
    player.inventory.splice(itemIndex, 1);
    player.equip.push(item);

    console.log(player);
    return player;
}

equipItem(testItem);