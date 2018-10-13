const mongoose = require('mongoose')
const Schema = mongoose.Schema

const petSchema = Schema({
  name: String,
  about: String,
  img: String,
  missing: String,

})

const Pet = mongoose.model('Pet', petSchema)

module.exports = Pet
