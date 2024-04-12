export function writeText(text) {
    const gameConsole = document.getElementById('gameConsole');
    gameConsole.innerHTML += `<p>${text}\n</p>`;
    gameConsole.scrollTop = gameConsole.scrollHeight;
}