export function writeText(text) {
    const gameConsole = document.getElementById('gameConsole');
    gameConsole.innerHTML += `<p>${text}\n</p>`;
    gameConsole.scrollTop = gameConsole.scrollHeight;
}

/*export function typeWriter(text, currentIndex = 0) {
    const gameConsole = document.getElementById('gameConsole');

    var speed = 50;
    if (currentIndex < text.length) {
        gameConsole.innerHTML += text.charAt(currentIndex);
        currentIndex++;
        setTimeout(() => typeWriter(text, currentIndex), speed);
    }

    gameConsole.scrollTop = gameConsole.scrollHeight;
}*/


const textQueue = [];
let isTyping = false;

export function typeWriter(text) {
    textQueue.push(text);
    if (!isTyping) {
        processQueue();
    }
}

function processQueue() {
    if (textQueue.length > 0) {
        isTyping = true;
        const currentText = textQueue.shift();
        typeWriterInternal(currentText, 0, () => {
            addEmptyLine();
            isTyping = false;
            processQueue();
        });
    }
}

function typeWriterInternal(text, currentIndex, callback) {
    const gameConsole = document.getElementById('gameConsole');
    const speed = 50;

    if (currentIndex < text.length) {
        gameConsole.innerHTML += text.charAt(currentIndex);
        gameConsole.scrollTop = gameConsole.scrollHeight;
        currentIndex++;
        setTimeout(() => typeWriterInternal(text, currentIndex, callback), speed);
    } else {
        //gameConsole.scrollTop = gameConsole.scrollHeight;
        callback();
    }

}

function addEmptyLine() {
    const gameConsole = document.getElementById('gameConsole');
    gameConsole.innerHTML += '<br><br>';
}
