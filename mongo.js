//unused in the main program

require('dotenv').config()
const mongoose = require('mongoose')
const Note = require('./models/note')


if (process.argv.length < 3) {
    console.log('Please provide the password as an argument: node mongo.js <password>')
    process.exit(1)
}

if (process.argv.length == 4) {
    console.log('Please provide the full instruction in this format:node mongo.js <password> <name> <Phone number>')
    process.exit(1)
}

const password = process.argv[2]

// const url = `mongodb+srv://miaomiaoxr:${password}@cluster0.zwe6x.mongodb.net/phonebook?retryWrites=true&w=majority`

const url = process.env.MONGODB_URL
console.log(url)

mongoose.connect(url)

// const noteSchema = new mongoose.Schema({
//     name: String,
//     number: String,
// })

// const Note = mongoose.model('Note', noteSchema)

if (process.argv.length === 3) {
    Note.find({}).then(notes => {
        notes.forEach(note => {
            console.log(note)
        })
        mongoose.connection.close()
        process.exit(0)
    })
}
else {
    const note = new Note({//if argv.length == 5
        name: process.argv[3],
        phoneNumber: process.argv[4]
    })

    note.save().then(result => {
        console.log(`added ${note.name} number ${note.phoneNumber} to phonebook`)
        mongoose.connection.close()
    })
}
