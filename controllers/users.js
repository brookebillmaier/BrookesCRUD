// //const bcrypt = require('bcrypt')
// const express = require('express')
// const user = express.Router()
// const User = require('../models/users.js')
// // var passport = require('passport')
// //   , LocalStrategy = require('passport-local').Strategy;
//
//
// user.get('/new', (req, res) => {
//   res.render('users/new.ejs')
// })
//
// user.get('/', (req, res)=> {
//   res.render('index.ejs', {
//     currentUser:req.session.currentUser
//   })
// })
//
//
// // passport.use(new LocalStrategy(
// //   function(username, password, done) {
// //     User.findOne({ username: username }, function (err, user) {
// //       if (err) { return done(err); }
// //       if (!user) {
// //         return done(null, false, { message: 'Incorrect username.' });
// //       }
// //       if (!user.validPassword(password)) {
// //         return done(null, false, { message: 'Incorrect password.' });
// //       }
// //       return done(null, user);
// //     });
// //   }
// // ));
//
//
//
// // user.post('/pets/',
// //   passport.authenticate('local'),
// //   function(req, res) {
// //     res.redirect('/pets/');
// //   });
//
//
// user.post('/', (req, res) => {
//   User.create(req.body, (err, createdUser) => {
//     if (err) {
//       console.log(err)
//     }
//     console.log(createdUser);
//     res.redirect('/pets');
//     currentUser: createdUser
//   })
// })
//
// user.get('/app', (req, res)=>{
//     if(req.session.currentUser){
//         res.send('the party');
//     } else {
//         res.redirect('/sessions/new');
//     }
// });
//
//
//
//
// module.exports = user
