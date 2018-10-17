const express = require('express')
const sessions = express.Router()
const User = require('../models/users.js')
const passport = require('passport')

sessions.get('/new', (req, res) => {
  res.render('sessions/new.ejs')
})

sessions.post('/', (req, res)=>{
    User.findOne({ username: req.body.username }, (err, foundUser) => {
        if(req.body.password == foundUser.password){
          req.session.currentUser = foundUser
            res.redirect('/pets')
        } else {
          res.send('<a href="/">wrong password</a>')
        }
    });
});

sessions.delete('/delete', (req, res)=>{
    req.session.destroy(() => {
        res.redirect('/pets')
    })
})


module.exports = sessions
