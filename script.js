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

        // Add text-to-speech icon
        const ttsIcon = document.createElement('span');
        ttsIcon.textContent = '🔊';
        ttsIcon.style.cursor = 'pointer';
        ttsIcon.style.marginLeft = '10px';
        ttsIcon.addEventListener('click', () => {
            const utterance = new SpeechSynthesisUtterance(message);
            speechSynthesis.speak(utterance);
        });
        userMessage.appendChild(ttsIcon);

        // Add timestamp
        const timestamp = document.createElement('span');
        const now = new Date();
        timestamp.textContent = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        timestamp.style.fontSize = '12px';
        timestamp.style.color = '#ccc';
        timestamp.style.marginLeft = '10px';
        userMessage.appendChild(timestamp);

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

            // Add text-to-speech icon for AI response
            const aiTtsIcon = document.createElement('span');
            aiTtsIcon.textContent = '🔊';
            aiTtsIcon.style.cursor = 'pointer';
            aiTtsIcon.style.marginLeft = '10px';
            aiTtsIcon.addEventListener('click', () => {
                const utterance = new SpeechSynthesisUtterance(aiMessage.textContent);
                speechSynthesis.speak(utterance);
            });
            aiMessage.appendChild(aiTtsIcon);

            // Add timestamp for AI response
            const aiTimestamp = document.createElement('span');
            aiTimestamp.textContent = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            aiTimestamp.style.fontSize = '12px';
            aiTimestamp.style.color = '#ccc';
            aiTimestamp.style.marginLeft = '10px';
            aiMessage.appendChild(aiTimestamp);

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

// Add export and copy buttons
document.body.insertAdjacentHTML('beforeend', `
    <div id="export-container">
        <button id="copy-button">Copy Chat</button>
        <button id="export-button">Export as PDF</button>
    </div>
`);

// Copy chat to clipboard
document.getElementById('copy-button').addEventListener('click', () => {
    const chatWindow = document.getElementById('chat-window');
    const chatText = Array.from(chatWindow.children).map(child => child.textContent).join('\n');
    navigator.clipboard.writeText(chatText).then(() => {
        alert('Chat copied to clipboard!');
    }).catch(err => {
        console.error('Failed to copy chat:', err);
    });
});

// Export chat as PDF
document.getElementById('export-button').addEventListener('click', () => {
    const chatWindow = document.getElementById('chat-window');
    const chatText = Array.from(chatWindow.children).map(child => child.textContent).join('\n');

    const doc = new jsPDF();
    doc.text(chatText, 10, 10);
    doc.save('chat.pdf');
});

// Load jsPDF library dynamically
const script = document.createElement('script');
script.src = 'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.4.0/jspdf.umd.min.js';
document.head.appendChild(script);

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

// Add chat history panel and toggle button
document.body.insertAdjacentHTML('beforeend', `
    <button id="chat-history-toggle">History</button>
    <div id="chat-history-panel">
        <ul id="chat-history-list">
            <!-- Chat history items will be dynamically added here -->
        </ul>
    </div>
`);

const chatHistoryToggle = document.getElementById('chat-history-toggle');
const chatHistoryPanel = document.getElementById('chat-history-panel');

// Toggle chat history panel visibility
chatHistoryToggle.addEventListener('click', () => {
    chatHistoryPanel.classList.toggle('open');
});

// Function to save chat history
function saveChatHistory(threadName, messages) {
    const chatHistoryList = document.getElementById('chat-history-list');
    const listItem = document.createElement('li');
    listItem.textContent = threadName;
    listItem.addEventListener('click', () => {
        alert(`Loading chat thread: ${threadName}`); // Placeholder for loading functionality
    });
    chatHistoryList.appendChild(listItem);
}

// Example usage of saveChatHistory
saveChatHistory('Thread 1', ['Hello', 'How are you?']);
saveChatHistory('Thread 2', ['What is the weather today?', 'It is sunny.']);