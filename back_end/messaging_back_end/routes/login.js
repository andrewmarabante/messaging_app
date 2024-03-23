var express = require('express');
var router = express.Router();
const loginControllers = require('../controllers/loginControllers.js')

/* GET home page. */
router.post('/', loginControllers.newUser)

module.exports = router;
