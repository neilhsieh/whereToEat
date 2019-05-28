const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Places = new Schema({
  name: {
    type: String,
    required: true
  }, 
  type: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  link: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model('Places', Places)