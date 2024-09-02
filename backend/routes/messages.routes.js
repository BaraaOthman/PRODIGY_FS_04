const express = require('express');
const { getMessagesController, postMessageController } = require('../controllers/messages.controllers');

const router = express.Router();

router.post('/send',postMessageController)
router.get('/messages',getMessagesController);

module.exports = router;