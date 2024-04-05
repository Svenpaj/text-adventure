document.addEventListener('DOMContentLoaded', () => {
    const gameConsole = document.getElementById('gameConsole');
    const commandInput = document.getElementById('commandInput');

    commandInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && commandInput.value.trim() !== '') {
            sendCommand(commandInput.value.trim());
            commandInput.value = ''; // Clear input field
        }
    });

    function sendCommand(command) {
        fetch('/api/command', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ command }),
        })
            .then(response => response.json())
            .then(data => {
                // Update the game console with the response from the server
                gameConsole.innerHTML += `<p>${data.message}</p>`;
                // Keep the latest entry in view
                gameConsole.scrollTop = gameConsole.scrollHeight;
            })
            .catch(error => {
                console.error('Error sending command:', error);
            });
    }
});
