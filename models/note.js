const mongoose = require('mongoose')
require('dotenv').config()

const url = process.env.MONGODB_URL
console.log('connect to ',url)

mongoose.connect(url)
    .then(result => console.log(`connected to MongoDB`))
    .catch((error) => console.log(`failed to connect to MongoDB :`,error.message))

const noteSchema = new mongoose.Schema({
    name: {
        type: String,
        minlength:1,
        required:true
    },
    number:{
        type: String,
        minlength:1,
        required:true
    }
})

noteSchema.set('toJSON',{
    transform: (document,returnObject)=>{
        returnObject.id = returnObject._id.toString()
        delete returnObject._id;
        delete returnObject.__v;
    }
})

module.exports = mongoose.model('Note',noteSchema)