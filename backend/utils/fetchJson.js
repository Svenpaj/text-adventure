const fs = require('fs');

let itemsJson = fs.readFileSync('backend/JSON/items.json');

let items = JSON.parse(itemsJson);

console.log(items);

console.log(`Weapon: ${items[0].name} \nDamage: ${items[0].damage}`);

export default { items }