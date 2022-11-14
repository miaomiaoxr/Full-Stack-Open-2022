import NetWork from '../services/NetWork'


const Persons = ({ persons, filterKey, setPersons, setMessage }) => {

    const deleteElement = (persons, deleteId, name) => {
        NetWork.remove(deleteId)
            .catch(error => {
                setMessage(`Information of ${name} has already been removed from this server`)
                setTimeout(() => { setMessage(null) }, 3000)
            })
        setPersons(persons.filter(person => person.id !== deleteId))
        setMessage(`Information of ${name} is deleted`)
        setTimeout(() => { setMessage(null) }, 3000)
}

    return (
        <div>
            <ul style={{ listStyleType: "none", padding: '0' }} > {/*different keywords from CSS*/}
                {persons
                    .filter((person) => {
                        return person
                            .name
                            .toLowerCase().includes(filterKey.toLowerCase())
                    })
                    .map(person => {
                        return (<div key={person.id.toString().concat('div')} style={{ display: 'flex' }}>
                            <li key={person.id}>
                                {person.name} {person.number}
                            </li>
                            <button key={person.id.toString().concat('button')} onClick={() => window.confirm(`Delete ${person.name} ?`) ? deleteElement(persons, person.id, person.name) : ""}>delete</button>
                        </div>)
                    })}
            </ul>
        </div>
    )
}

export default Persons