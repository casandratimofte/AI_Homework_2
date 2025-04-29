// JavaScript to handle chat UI interactions with animations
document.getElementById('send-button').addEventListener('click', function() {
    const inputField = document.getElementById('chat-input');
    const message = inputField.value.trim();

    if (message) {
        const chatWindow = document.getElementById('chat-window');

        // Add user message to chat window
        const userMessage = document.createElement('div');
        userMessage.textContent = message;
        userMessage.style.textAlign = 'right';
        userMessage.style.margin = '10px 0';
        userMessage.style.padding = '10px';
        userMessage.style.backgroundColor = '#ff69b4';
        userMessage.style.color = '#fff';
        userMessage.style.borderRadius = '10px';
        userMessage.style.display = 'inline-block';
        userMessage.style.animation = 'fadeIn 0.5s ease';
        chatWindow.appendChild(userMessage);

        // Clear input field
        inputField.value = '';

        // Scroll to the bottom of the chat window
        chatWindow.scrollTop = chatWindow.scrollHeight;

        // Placeholder for AI response (to be implemented later)
        setTimeout(() => {
            const aiMessage = document.createElement('div');
            aiMessage.textContent = 'AI response goes here...';
            aiMessage.style.textAlign = 'left';
            aiMessage.style.margin = '10px 0';
            aiMessage.style.padding = '10px';
            aiMessage.style.backgroundColor = '#ffe4e1';
            aiMessage.style.color = '#000';
            aiMessage.style.borderRadius = '10px';
            aiMessage.style.display = 'inline-block';
            aiMessage.style.animation = 'fadeIn 0.5s ease';
            chatWindow.appendChild(aiMessage);

            chatWindow.scrollTop = chatWindow.scrollHeight;
        }, 1000);
    }
});

// Add a dark mode toggle button
document.body.insertAdjacentHTML('beforeend', `
    <button id="dark-mode-toggle" style="position: fixed; top: 10px; right: 10px; padding: 10px; border: none; border-radius: 5px; background-color: #ff69b4; color: #fff; cursor: pointer;">Toggle Dark Mode</button>
`);

const darkModeToggle = document.getElementById('dark-mode-toggle');
darkModeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    document.getElementById('chat-container').classList.toggle('dark-mode');
    document.getElementById('chat-window').classList.toggle('dark-mode');
    document.getElementById('input-container').classList.toggle('dark-mode');
    document.getElementById('chat-input').classList.toggle('dark-mode');
    document.getElementById('send-button').classList.toggle('dark-mode');
});

// Animation for fading in messages
const style = document.createElement('style');
style.textContent = `
@keyframes fadeIn {
    0% {
        opacity: 0;
    }
    100% {
        opacity: 1;
    }
}`;
document.head.appendChild(style);