const mongoose = require('mongoose')
require('dotenv').config()

const url = process.env.MONGODB_URL
console.log('connect to ', url)

mongoose.connect(url)
  .then(() => console.log('connected to MongoDB'))
  .catch((error) => console.log('failed to connect to MongoDB :', error.message))

const noteSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 3,
    required: true
  },
  number: {
    type: String,
    minlength: 1,
    validate: {
      validator: function (number) {
        if (number.length < 8) {
          return false
        }

        const numbers = number.split('-')
        if (numbers.length > 2 || numbers[0].length < 2 || numbers[0].length > 3) return false

        return true
      },
      message: props => `${props.path} length must be 8 or more, no more than 2 hyphens, and the first part must be 2 or 3 digits`
    },
    required: true
  }
})

noteSchema.set('toJSON', {
  transform: (document, returnObject) => {
    returnObject.id = returnObject._id.toString()
    delete returnObject._id
    delete returnObject.__v
  }
})

module.exports = mongoose.model('Note', noteSchema)