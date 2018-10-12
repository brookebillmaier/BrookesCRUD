const mongoose = require('mongoose')

const Schema = mongoose.Schema

const petSchema = Schema({
  name: String,
  about: [Array],
  missing: [Array],

})

const Pet = mongoose.model('Pet', petSchema)

module.exports = Pet
