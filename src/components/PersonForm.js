import NetWork from "../services/NetWork"

const PersonForm = ({ persons, setPersons, newName, setNewName, newNumber, setNewNumber, setMessage }) => {

    const numberRenew = (newName, newNumber) => {//making changes to the phone numbers ON BACKEND
        let newObject = persons.filter(person => person.name.toLowerCase() === newName.toLowerCase())[0]
        newObject = { ...newObject, number: newNumber }
        let newPersons = persons.filter(person => person.id !== newObject.id)
        newPersons.push(newObject)
        console.log(newPersons)
        setPersons(newPersons)
        NetWork.update(newObject)
    }

    const addName = (event) => {
        event.preventDefault()
        if (!persons.map(person => person.name).includes(newName)) {
            setMessage(`Added ${newName}`)
            setTimeout(() => { setMessage(null) }, 3000);

            const newObject = {
                name: newName,
                id: parseInt(10000 * Math.random(), 10),
                number: newNumber,
            }
            NetWork
                .create(newObject)
                .then(response => setPersons(persons.concat(response.data)))
        }
        else {/*TODO: making changes to the phone numbers ON BACKEND */
            if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
                numberRenew(newName, newNumber)
                setMessage(`${newName}'s number has been updated`)
                setTimeout(() => { setMessage(null) }, 3000)
            }
        }
        setNewName("")
        setNewNumber("")
    }

    const handleNameChange = (event) => setNewName(event.target.value)
    const handleNumChange = (event) => setNewNumber(event.target.value)

    return (
        <div>
            <form onSubmit={addName}>
                <div>
                    name: <input value={newName} placeholder="input a name" onChange={handleNameChange} />
                </div>
                <div>
                    number:<input value={newNumber} placeholder="input a phone number" onChange={handleNumChange} />
                </div>
                <div>
                    <button type="submit">add</button>
                </div>
            </form>
        </div>
    )
}

export default PersonForm