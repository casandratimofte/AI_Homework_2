// JavaScript to handle chat UI interactions with animations

// Select DOM elements
const chatInput = document.getElementById('chat-input');
const sendButton = document.getElementById('send-button');
const chatWindow = document.getElementById('chat-window');

// Update the backend URL to ensure it is correct
const BACKEND_URL = 'http://127.0.0.1:5000';

// Function to append messages to the chat window
function appendMessage(sender, message) {
    const messageDiv = document.createElement('div');
    messageDiv.className = sender;
    messageDiv.textContent = `${sender}: ${message}`;
    chatWindow.appendChild(messageDiv);
}

// Function to send a message to the backend
async function sendMessage() {
    const message = chatInput.value.trim();
    if (!message) return;

    // Append user message to the chat window
    appendMessage('User', message);

    try {
        // Send message to the backend
        const response = await fetch(`${BACKEND_URL}/chat`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ message }),
        });

        if (response.ok) {
            const data = await response.json();
            // Append AI response to the chat window
            appendMessage('AI', data.response);
        } else {
            console.error('Error communicating with the backend:', response.statusText);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Failed to connect to the backend. Please ensure the server is running.');
    }

    // Clear the input field
    chatInput.value = '';
}

// Function to fetch chat history
async function fetchChatHistory() {
    try {
        const response = await fetch(`${BACKEND_URL}/history`);
        if (response.ok) {
            const data = await response.json();
            data.history.forEach(chat => {
                appendMessage(chat.sender, chat.message);
            });
        } else {
            console.error('Error fetching chat history:', response.statusText);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Failed to fetch chat history. Please ensure the server is running.');
    }
}

// Event listener for the send button
sendButton.addEventListener('click', sendMessage);

// Event listener for pressing Enter in the input field
chatInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        sendMessage();
    }
});

// Fetch chat history on page load
window.onload = fetchChatHistory;

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