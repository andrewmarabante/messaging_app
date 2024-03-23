const User = require('../models/user')
const auth = require('../auth')

const newUser = async (req, res) => {
    const username = req.body.username;
    const hashedPass = await auth.bcrypt.hash(req.body.password, 10)
    const userDetails = {
        'username' : username,
        'password' : hashedPass,
        'imageURL' : '',
        'online' : false,
        'friends' : []
    }
    const newUser = new User(userDetails)

    newUser.save()
    .then(
        res.json('saved')
    )
    .catch(err => console.log(err))
}

module.exports = {
    newUser
}