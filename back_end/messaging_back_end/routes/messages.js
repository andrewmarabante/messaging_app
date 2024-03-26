var express = require('express');
var router = express.Router();
const messageControllers = require('../controllers/messageControllers')
const auth = require('../auth')


router.get('/', auth.authenticateToken, messageControllers.getChats)

router.post('/', auth.authenticateToken, messageControllers.newChat)

router.get('/:id', auth.authenticateToken, messageControllers.getMessages)

router.post('/:id', auth.authenticateToken, messageControllers.newMessage)

module.exports = router;
