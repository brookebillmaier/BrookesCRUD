//___________________
//Dependencies
//___________________
const express = require('express');
const methodOverride  = require('method-override');
const mongoose = require ('mongoose');
const app = express ();
const db = mongoose.connection;
const session = require('express-session')
const bodyParser = require('body-parser')
const pets = express.Router()



//use public folder for static assets like css
app.use(express.static('public'))

//populates req.body with parsed info from forms, if no data from forms it will return an empty object
app.use(express.urlencoded({extended: false})) //extended: false - does not allow nested objects in query strings
app.use(express.json());//returns middleware that onlt parses JSON
app.use(bodyParser.json())
//method methodOverride
app.use(methodOverride('_method'))//alow post, put and delete from a form

app.use(session({
  secret: "secret",
  resave: false,
  saveUninitialized: false
}))



//const bcyrpt = require('bcrypt')
//___________________
//Port
//___________________
// Allow use of Heroku's port or your own local port, depending on the environment
const PORT = process.env.PORT || 3000;

//___________________
//Database
//___________________
// How to connect to the database either via heroku or locally
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/'+ `findmefido`;



//Connect to Mongo
mongoose.connect(MONGODB_URI , {useNewUrlParser: true})

// Error / success messages
db.on('error', (err) => console.log(err.message + ' is Mongod not running?'));
db.on('connected', () => console.log('mongo connected: ', MONGODB_URI));
db.on('disconnected', () => console.log('mongo disconnected'));

// open the connection to mongo
db.on('open' , ()=>{});




//Controllers
const sessionsController =
require('./controllers/sessions.js')
app.use('/sessions', sessionsController)

const userController = require('./controllers/users.js')
app.use('/users', userController)

const petsController = require('./controllers/pets')
app.use('/', petsController)


app.get('/', (req, res)=> {
  res.redirect('/pets')
})

//listen
app.listen(PORT, () => {
  console.log('listening on port:', PORT)
})

// const Pet = require('./models/pets')
// app.get('/pets', (req, res)=> {
//   res.render('index.ejs', {
//     currentUser: req.session.currentUser,
//   })
// })
//

//
// pets.get('/', (req, res)=> {
//   Pet.find({}, (err, pets)=> {
//     if(err){console.log(err);}
//     res.render('/index.ejs', { pets: pets })
//   })
// })
//
// const seed = require('./models/seed.js')
// app.get('/seed', (req, res)=> {
//   Pet.create(seed, (err, createdPets)=> {
//     console.log(createdPets);
//     res.redirect('/')
//     })
//   })
