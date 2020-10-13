const { Schema, model } = require('mongoose')

const userData = Schema({
  user: String,
  money: {
    default: 0,
    type: Number
  },
  stone: {
    default: 0,
    type: Number
  }
})

module.exports = model('UserData', userData);