// JavaScript to handle chat UI interactions
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
        chatWindow.appendChild(userMessage);

        // Clear input field
        inputField.value = '';

        // Scroll to the bottom of the chat window
        chatWindow.scrollTop = chatWindow.scrollHeight;

        // Placeholder for AI response (to be implemented later)
        const aiMessage = document.createElement('div');
        aiMessage.textContent = 'AI response goes here...';
        aiMessage.style.textAlign = 'left';
        aiMessage.style.margin = '10px 0';
        chatWindow.appendChild(aiMessage);

        chatWindow.scrollTop = chatWindow.scrollHeight;
    }
});