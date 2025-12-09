
const messagesEl = document.getElementById('messages');
const messageInput = document.getElementById('messageInput');
const sendBtn = document.getElementById('sendBtn');

// Создаём кнопку очистки
const clearBtn = document.createElement('button');
clearBtn.id = 'clearBtn';
clearBtn.textContent = 'Очистить';
document.querySelector('.input-container').appendChild(clearBtn);

// Инициализация
loadMessages();

sendBtn.addEventListener('click', sendMessage);
messageInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') sendMessage();
});

clearBtn.addEventListener('click', clearChat);

async function loadMessages() {
  try {
    const response = await fetch('/api/chat?limit=50');
    const data = await response.json();
    messagesEl.innerHTML = '';
    displayMessages(data.messages);
  } catch (error) {
    console.error('Ошибка загрузки сообщений:', error);
  }
}

async function sendMessage() {
  const message = messageInput.value.trim();
  if (!message) return;

  try {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message })
    });
    
    const data = await response.json();
    displayMessages(data.messages);
    messageInput.value = '';
  } catch (error) {
    console.error('Ошибка отправки:', error);
  }
}

// кнопка "Очистить" — перезапуск диалога
async function clearChat() {
  try {
    const response = await fetch('/api/chat/reset', {
      method: 'POST'
    });
    const data = await response.json();
    messagesEl.innerHTML = '';
    displayMessages(data.messages);
  } catch (error) {
    console.error('Ошибка очистки чата:', error);
  }
}

function displayMessages(messages) {
  messages.forEach(msg => {
    const messageEl = document.createElement('div');
    messageEl.className = `message ${msg.user}`;
    messageEl.innerHTML = `
      <div class="user">${msg.user === 'user' ? 'Вы' : 'Умникум Гордеус'}</div>
      <div class="text">${escapeHtml(msg.text)}</div>
      <div class="time">${new Date(msg.timestamp).toLocaleString('ru-RU')}</div>
    `;
    messagesEl.appendChild(messageEl);
  });
  messagesEl.scrollTop = messagesEl.scrollHeight;
}

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}
