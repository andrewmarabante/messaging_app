const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('./models/user')

// const jwtOptions = {
//     jwtFromRequest: ExtractJwt.fromCookie('jwt')  ,
//     secretOrKey: process.env.SECRET
//   };

//   passport.use(new JwtStrategy(jwtOptions, async (payload, done) => {
//     try{
//         const user = await User.findById(payload.sub);
//         if(user){
//             done(null, user);
//         }else{
//             done (null, false)
//         }
//     }catch (err){
//         done(err, false)
//     }
//   }));
  
  module.exports = {
    bcrypt,
    jwt
  }