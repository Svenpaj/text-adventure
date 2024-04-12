export function writeText(text) {
    const gameConsole = document.getElementById('gameConsole');
    gameConsole.innerHTML += `<p id="typedText">${text} \n</p>`;
    gameConsole.scrollTop = gameConsole.scrollHeight;
}