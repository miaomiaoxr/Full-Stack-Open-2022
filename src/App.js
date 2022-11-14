import React, { useState, useEffect } from 'react'
import NetWork from './services/NetWork'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import SuccessNotification from './components/SuccessNotification'
import ErrorNotification from './components/ErrorNotification'


const App = () => {

  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState("")
  const [newNumber, setNewNumber] = useState("")
  const [filterKey, setFilterKey] = useState("")
  const [successMessage,setSuccessMessage] = useState(null)
  const [errorMessage,setErrorMessage] = useState(null)

  useEffect(() => {
    NetWork
      .getAll()
      .then(response => setPersons(response.data))
  }, [])

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter setFilterKey={setFilterKey} />
      <h3>Add a new</h3>
      <SuccessNotification message = {successMessage} />
      <PersonForm persons={persons} setPersons={setPersons} newNumber={newNumber} setNewNumber={setNewNumber} setNewName={setNewName} newName={newName} setMessage = {setSuccessMessage}/>
      <h3>Numbers</h3>
      <ErrorNotification message = {errorMessage} />
      <Persons persons={persons} filterKey={filterKey} setPersons={setPersons} setMessage = {setErrorMessage}/>
    </div>
  )
}

export default App