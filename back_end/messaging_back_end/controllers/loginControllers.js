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

const loginUser = (req,res) => {
    const username = req.body.username;
    const password = req.body.password;
    User.find({username : username})
    .then(async (user) => {
        if(user.length === 0){
            res.json('Wrong Username')
        }else{
        const hashedPass = user[0].password
        const match = await auth.bcrypt.compare(password, hashedPass);
        if(!match){
            res.json('Wrong Password!')
        }else{f
            const token = auth.jwt.sign({userId : user[0]._id}, process.env.SECRET);
            res.cookie('jwt', token, { httpOnly: true, path: '/'});
            res.json('success')  
        }}
    })
    .catch(err => res.json('Error'))

}

module.exports = {
    newUser,
    loginUser
}