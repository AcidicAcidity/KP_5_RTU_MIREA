
const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chatController');

// GET /api/chat?limit=10
router.get('/', chatController.getMessages);

// POST /api/chat
router.post('/', chatController.sendMessage);

// POST /api/chat/reset — очистка/перезапуск диалога
router.post('/reset', chatController.resetChat);

module.exports = router;
