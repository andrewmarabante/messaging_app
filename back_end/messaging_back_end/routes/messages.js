var express = require('express');
var router = express.Router();
const messageControllers = require('../controllers/messageControllers')
const auth = require('../auth')


router.get('/', auth.authenticateToken, messageControllers.getChats)

module.exports = router;
