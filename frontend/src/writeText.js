export function writeText(text) {
    const gameConsole = document.getElementById('gameConsole');
    gameConsole.innerHTML += `<p>${text}\n</p>`;
    gameConsole.scrollTop = gameConsole.scrollHeight;
}

export function typeWriter(text, currentIndex = 0) {
    const gameConsole = document.getElementById('gameConsole');

    var speed = 50;
    if (currentIndex < text.length) {
        gameConsole.innerHTML += text.charAt(currentIndex);
        currentIndex++;
        setTimeout(() => typeWriter(text, currentIndex), speed);
    }

    gameConsole.scrollTop = gameConsole.scrollHeight;
}