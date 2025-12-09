const express = require('express');
const path = require('path');
const loggerMiddleware = require('./middleware/logger');
const chatRoutes = require('./routes/chat');

const app = express();
const PORT = 3000;

// Middleware
app.use(loggerMiddleware); // Собственный middleware
app.use(express.json()); // Парсинг JSON
app.use(express.urlencoded({ extended: true })); // Парсинг URL-encoded
app.use(express.static(path.join(__dirname, 'public'))); // Статические файлы

// Маршруты
app.use('/api/chat', chatRoutes);

// Обработка 404
app.use((req, res) => {
  res.status(404).json({ error: 'Маршрут не найден' });
});

app.listen(PORT, () => {
  console.log(`Сервер запущен на http://localhost:${PORT}`);
});
