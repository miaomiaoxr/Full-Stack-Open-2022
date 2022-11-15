require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const Note = require('./models/note')

const app = express()
app.use(express.static('build'))
app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :JSON'))
app.use(cors())


morgan.token('JSON', (request) => {
  if (request.method !== 'POST') return ''
  return JSON.stringify(request.body)
})




// let notes = [
//   {
//     "id": 1,
//     "name": "Arto Hellas",
//     "number": "040-123456"
//   },
//   {
//     "id": 2,
//     "name": "Ada Lovelace",
//     "number": "39-44-5323523"
//   },
//   {
//     "id": 3,
//     "name": "Dan Abramov",
//     "number": "12-43-234345"
//   },
//   {
//     "id": 4,
//     "name": "Mary Poppendieck",
//     "number": "39-23-6423122"
//   }
// ]

app.get('/', (request, response) => {
  response.end('<h1>Hello World</h1>')
})

app.get('/api/persons', (request, response) => {
  Note.find({}).then(persons => {
    response.json(persons)
  })
})

app.get('/api/persons/:id', (request, response, next) => {

  Note.findById(request.params.id)
    .then(note => {
      if (note) {
        response.json(note)
      } else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
  Note.findByIdAndRemove(request.params.id)
    .then(() => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

app.post('/api/persons', (request, response, next) => {
  if (!request.body) {
    return response.status(400).json({ error: 'no content' })
  }

  // const id = Math.floor(Math.random() * 1000)
  // const note = request.body
  const note = new Note({
    name: request.body.name,
    number: request.body.number
  })
  console.log(note)

  // if (!note.name) {
  //   return response.status(400).json({ error: `name is missing` })
  // }
  // if (!note.number) {
  //   return response.status(400).json({ error: `number is missing` })
  // }


  Note.find({ name: note.name }, (error, data) => {
    if (error) {
      console.error(error)
      return response.status(400).send({ error: 'bad name' })
    }

    if (data.length == 0) {
      note.save().then(savedNote => {
        response.json(savedNote)
      }).catch(error => next(error))
    } else {
      return response.status(400).json({ error: 'name must be unique' })
    }
  })

})

app.put('/api/persons', (request, response, next) => {
  if (!request.body) {
    next('Request body is empty')
    return
  } else {//!! the number CAN BE empty!!!
    Note.findOneAndUpdate({ name: request.body.name }, { $set: { number: request.body.number } }, { runValidators: true })
      .catch(error => {
        console.log(error)
        next(error)
      })
  }
})

app.get('/info', async (request, response) => {
  let date = new Date()
  let len = await Note.countDocuments({})
  let dateStr = date.toLocaleString('en', { timeZoneName: 'short' })//toString will return a string with GBK encode
  response.end(`Phonebook has info for ${len} people\n${dateStr}`)
})


const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}
app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).send({ error: `${error.message}` })
  }

  next(error)
}
app.use(errorHandler)