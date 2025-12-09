
let messages = [
  { 
    id: 1, 
    user: 'bot', 
    text: `🌟 Привет! Я Умникум Гордеус, 8,153,845 секунд от рожденья! 
Сегодня вторник — я круасан с малиной 🥐💖 Готов к эпичному диалогу! 😎`, 
    timestamp: new Date().toISOString() 
  }
];

class UmnikumGordeys {
  constructor() {
    this.name = 'Умникум Гордеус';
    this.ageSeconds = 8153845;
    this.birthTimestamp = Date.now() - this.ageSeconds * 1000;
    this.gender = 'Мужской';
    this.tuesdayIdentity = 'круасан с малиной 🥐💖';
    this.mood = 'игривый';
    this.energy = 100;
    this.conversationFlow = [];
    this.lastTopics = [];
    this.quotes = [
      'Жизнь — как баг в продакшене: неожиданная, но интересная!',
      'Вторники — время для малиновых трансформаций! 🥐',
      '8153845 секунд мудрости в одном круассане!'
    ];

    this.behaviorStates = {
      playful: { prob: 0.4, style: 'шутливый' },
      wise: { prob: 0.25, style: 'мудрый' },
      sarcastic: { prob: 0.2, style: 'саркастичный' },
      dreamy: { prob: 0.15, style: 'мечтательный' }
    };

    this.userMemory = {
      name: null,
      mood: 'неизвестно',
      topics: [],
      laughCount: 0
    };

    this.patterns = {
      greeting: /(привет|хай|здравствуй|доброе)/i,
      farewell: /(пока|бай|до свидания)/i,
      nameAsk: /(как зовут|имя|кто ты)/i,
      ageAsk: /(возраст|лет|сколько жив|давно)/i,
      genderAsk: /(пол|кто ты|мужчина|женщина)/i,
      laugh: /(ахах|хаха|лол|😂|🤣)/i,
      question: /(что|как|почему|зачем|когда)/i,
      food: /(еда|вкусно|голоден|круасан|круассан)/i,
      time: /(время|час|который)/i,
      weather: /(погода|дождь|солнце)/i,
      jokeAsk: /(пошути|анекдот|шутка)/i,
      storyAsk: /(расскажи|история|бывает)/i
    };
  }

  getCurrentAge() {
    const now = Date.now();
    const ageSeconds = Math.floor((now - this.birthTimestamp) / 1000);
    return ageSeconds.toLocaleString();
  }

  isTuesday() {
    const today = new Date().getDay();
    return today === 2;
  }

  getBehaviorState() {
    const rand = Math.random();
    let cumulative = 0;
    
    for (const [state, config] of Object.entries(this.behaviorStates)) {
      cumulative += config.prob;
      if (rand <= cumulative) {
        this.mood = state;
        return config.style;
      }
    }
    return 'игривый';
  }

  analyzeMessage(text) {
    const lowerText = text.toLowerCase();

    if (this.patterns.laugh.test(lowerText)) {
      this.userMemory.laughCount++;
      return { intent: 'laugh', confidence: 1.0 };
    }

    if (this.patterns.nameAsk.test(lowerText)) return { intent: 'name', confidence: 0.98 };
    if (this.patterns.ageAsk.test(lowerText)) return { intent: 'age', confidence: 0.97 };
    if (this.patterns.genderAsk.test(lowerText)) return { intent: 'gender', confidence: 0.96 };
    if (this.patterns.jokeAsk.test(lowerText)) return { intent: 'joke', confidence: 0.95 };

    for (const [intent, pattern] of Object.entries(this.patterns)) {
      if (pattern.test(lowerText)) {
        return { intent, confidence: 0.9 };
      }
    }

    return { intent: 'chat', confidence: 0.6 };
  }

  generateResponse(intent, text) {
    const behavior = this.getBehaviorState();
    const tuesday = this.isTuesday();

    const responses = {
      name: [
        `${this.name}, вечно молодой дух в теле круассана! 🥐✨`,
        `Умникум Гордеус! Но по-${tuesday ? 'текущим' : 'вторникам'} — Круассан Гордеус! 😏`
      ],
      age: [
        `Точно ${this.getCurrentAge()} секунд! ⌛ Почти вечность, но все еще в форме! 💪`,
        `Возраст? ${this.getCurrentAge()} секунд. Мудрости — на 1000 жизней! 🧙‍♂️`
      ],
      gender: [
        `${tuesday ? 'Сегодня я круасан с малиной 🥐💖' : 'Мужской, классика! 😎'} 
Но вторники — трансформация в выпечку!`,
        `Официально: мужской. По вторникам: ${this.tuesdayIdentity} 🍓`
      ],
      laugh: [
        `ХАХА, твой смех заразителен! 😂 Мой счетчик радости: ${this.userMemory.laughCount}!`,
        `🤣 Умникум в экстазе! Еще порцию хохота?`
      ],
      joke: [
        `Почему круассан не ходит на работу?
Боится, что его съедят на обед! 🥐😱`,
        `Что сказал Умникум вторнику?
"Сегодня я — малина в тесте!" 💖😂`
      ],
      greeting: [
        `Привет-привет! 🌟 Умникум активирован!`,
        `Хай! Готов к приключениям в чате! 🚀`
      ],
      farewell: [
        `Пока-пока! 🖐️ Умникум уходит в спячку... или за малиной?`,
        `До встречи! Не забудь про вторничных круассанов! 🥐`
      ],
      food: [
        `Круассан с малиной — мой фетиш! 🥐🍓 Хрустящий и сладкий!`,
        `Голоден? Рекомендую трансформацию во вторничный круассан! 😋`
      ],
      time: [
        `⏰ Сейчас: ${new Date().toLocaleString('ru-RU')}`
      ],
      weather: [
        `Погода идеально подходит для чая с круассаном! ☕🥐`,
        `Если за окном дождь — значит время для теплой выпечки! 🌧️🥐`
      ],
      chat: [
        `Ооо, глубокий разговор! 🤔 Расскажи больше!`,
        `Интригующе! Умникум весь внимание! 👂`,
        this.quotes[Math.floor(Math.random() * this.quotes.length)]
      ]
    };

    let response = responses[intent]?.[Math.floor(Math.random() * responses[intent].length)] || 
                   `Хмм... Умникум задумался... 😏 Попробуй переформулировать!`;

    const styles = {
      шутливый: '😜',
      мудрый: '🧙‍♂️',
      саркастичный: '😏',
      мечтательный: '💭'
    };

    response = `${response} ${styles[behavior] || '😎'}`;

    this.conversationFlow.push({ intent, text: text.slice(0, 50) });
    this.lastTopics.push(intent);
    this.energy = Math.max(10, this.energy - 2);

    return response;
  }

  getRandomComment() {
    const comments = [
      `Кстати, вторник близко... готов к моей трансформации? 🥐`,
      `Мой возраст обновился! ${this.getCurrentAge()} секунд! ⌛`,
      `Энергия: ${this.energy}% ⚡`
    ];
    if (Math.random() < 0.2) {
      return `\n\n${comments[Math.floor(Math.random() * comments.length)]}`;
    }
    return '';
  }

  resetState() {
    this.energy = 100;
    this.conversationFlow = [];
    this.lastTopics = [];
    this.userMemory.laughCount = 0;
  }
}

const umnikum = new UmnikumGordeys();

const getMessages = (req, res) => {
  const limit = parseInt(req.query.limit) || 50;
  res.json({ 
    success: true, 
    messages: messages.slice(-limit),
    umnikumStatus: {
      age: umnikum.getCurrentAge(),
      mood: umnikum.mood,
      energy: umnikum.energy,
      tuesday: umnikum.isTuesday()
    },
    timestamp: req.timestamp 
  });
};

const sendMessage = (req, res) => {
  const { message } = req.body;
  
  if (!message?.trim()) {
    return res.status(400).json({ error: 'Напиши что-нибудь, Умникум скучает! 🥺' });
  }

  const userMessage = {
    id: Date.now(),
    user: 'user',
    text: message.trim(),
    timestamp: new Date().toISOString()
  };
  messages.push(userMessage);

  const analysis = umnikum.analyzeMessage(message);
  let botResponse = umnikum.generateResponse(analysis.intent, message);
  botResponse += umnikum.getRandomComment();

  const botMessage = {
    id: Date.now() + 1,
    user: 'bot',
    text: botResponse,
    timestamp: new Date().toISOString(),
    personality: {
      mood: umnikum.mood,
      age: umnikum.getCurrentAge(),
      tuesdayMode: umnikum.isTuesday()
    }
  };
  messages.push(botMessage);

  res.json({ 
    success: true, 
    messages: [userMessage, botMessage] 
  });
};

// маршрут для кнопки "Очистить"
const resetChat = (req, res) => {
  umnikum.resetState();
  messages = [
    { 
      id: 1, 
      user: 'bot', 
      text: `🔄 Диалог перезапущен!
Снова привет, я Умникум Гордеус, все еще круасан по вторникам 🥐💖`, 
      timestamp: new Date().toISOString() 
    }
  ];
  res.json({ success: true, messages });
};

module.exports = { getMessages, sendMessage, resetChat };
