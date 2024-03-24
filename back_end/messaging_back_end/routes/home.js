var express = require('express');
var router = express.Router();
const homeControllers = require('../controllers/homeControllers')
const auth = require('../auth')

/* GET home page. */
router.get('/', auth.authenticateToken, homeControllers.getUserInfo)

router.get('/friends', auth.authenticateToken, homeControllers.getFriends)

router.get('/suggested', auth.authenticateToken, homeControllers.getSuggested)

router.put('/friends', auth.authenticateToken, homeControllers.deleteFriend)

router.post('/friends', auth.authenticateToken, homeControllers.addFriend)

module.exports = router;
