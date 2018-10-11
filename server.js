//___________________
//Dependencies
//___________________
const express = require('express');
const methodOverride  = require('method-override');
const mongoose = require ('mongoose');
const app = express ();
const db = mongoose.connection;
//___________________
//Port
//___________________
// Allow use of Heroku's port or your own local port, depending on the environment
const PORT = process.env.PORT || 3000;

//___________________
//Database
//___________________
// How to connect to the database either via heroku or locally
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/'+ `project2`;


//Connect to Mongo
mongoose.connect(MONGODB_URI , {useNewUrlParser: true})

// Error / success messages
db.on('error', (err) => console.log(err.message + ' is Mongod not running?'));
db.on('connected', () => console.log('mongo connected: ', MONGODB_URI));
db.on('disconnected', () => console.log('mongo disconnected'));

// open the connection to mongo
db.on('open' , ()=>{});

//use public folder for static assets like css
app.use(express.static('public'))

//populates req.body with parsed info from forms, if no data from forms it will return an empty object

app.use(express.urlencoded({extended: false})) //extended: false - does not allow nested objects in query strings
app.use(express.json());//returns middleware that onlt parses JSON

//method methodOverride
app.use(methodOverride('_method'))//alow post, put and delete from a form


//routes
app.get('/', (req, res)=> {
  res.send('hello world')
})

//listen
app.listen(PORT, () => {
  console.log('listening on port:', PORT)
})
