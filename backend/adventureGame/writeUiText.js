function writeText(message) {
    const gameConsole = document.getElementById('gameConsole');
    gameConsole.innerHTML += `<p>${message}</p>`;
}