const { request, response } = require('express')
const express = require('express')
const morgan = require('morgan')
const cors  = require('cors')

const app = express()
app.use(express.json())
app.use(express.static('build'))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :JSON'))
app.use(cors())

morgan.token('JSON',(request,response)=>{
  if(request.method !=='POST') return ""
  return JSON.stringify(request.body)
})

let notes = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get('/',(request,response)=>{
    response.end('<h1>Hello World</h1>')
})

app.get('/api/persons',(request,response)=>{
    response.end(JSON.stringify(notes))
})

app.get('/api/persons/:id',(request,response)=>{
    const id = Number(request.params.id)
    const note = notes.find(note => note.id === id)
    if(note){
      response.json(note)
    }else{
      response.status(404).end()
    }
})

app.delete('/api/persons/:id',(request,response)=>{
    const id = request.params.id
    notes = notes.filter(note=>note.id!==id)

    response.status(204).end()
})

app.post('/api/persons',(request,response)=>{
  if(!request.body){
    return response.status(400).json({error:`no content`})
  }

  const id = Math.floor(Math.random()*1000)
  const note = request.body
  note.id = id 

  if(!note.number){
    return response.status(400).json({error:`number is missing`})
  }
  if(!note.name){
    return response.status(400).json({error:`name is missing`})
  }
  if(notes.find(n=>n.name === note.name)){
    return response.status(400).json({error:`name must be unique`})
  }
  

  notes.concat(note)
  response.json(note)
})

app.get('/info',(request,response)=>{
    let date = new Date()
    let dateStr = date.toLocaleString('en',{timeZoneName:'short'})//toString will return a string with GBK encode
    response.end(`Phonebook has info for ${notes.length} people\n${dateStr}`)
})


const PORT = process.env.PORT||3001
app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`)
})