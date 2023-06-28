import { useState, useEffect } from 'react'
import personService from './services/persons'

const PersonForm = (props) => {
  return (
    <form onSubmit={props.addPerson}>
      <div>name: <input value={props.newName} onChange={props.handleNameInput} /></div>
      <div>number: <input value={props.newNum} onChange={props.handleNumInput} /></div>
      <div><button type="submit">add</button></div>
    </form>
  )
}

const Person = (props) => {
  return(
    <div key={props.person.name}>
      {props.person.name} {props.person.number}
      <button onClick={props.deletePerson}>Delete</button>
    </div>
  )
}

const Persons = (props) => {
  return (
    <>
      {props.persons.map(person => 
        <Person 
          key={person.name} 
          person={person} 
          deletePerson={() => props.deletePerson(person.id)} 
        />
      )}
    </>
  )
}

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNum, setNewNum] = useState('')

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const handleNameInput = (event) => {
    setNewName(event.target.value)
  }

  const handleNumInput = (event) => {
    setNewNum(event.target.value)
  }

  const addPerson = (event) => {
    event.preventDefault()
    if (persons.some(person => person.name === newName)) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        // Find and update existing person.number with newNum
        const person = persons.find(p => p.name === newName)
        const changedPerson = { ...person, number: newNum }

        personService
          .update(changedPerson.id, changedPerson)
          .then(returnedPerson => {
            setPersons(persons.map(person => person.id !== changedPerson.id ? person : returnedPerson))
          })
      }
    } else {
      const personObject = {
        name: newName,
        number: newNum
      }

      personService
        .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNum('')
        })
    }
  }

  const deletePerson = (id) => {
    personService
      .del(id)
      .then(response => {
        setPersons(persons.filter(p => p.id !== id))
      })
      .catch(error => {
        alert(`Person with id ${id} not found (could already be deleted).`)
      })
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <PersonForm addPerson={addPerson} handleNameInput={handleNameInput} handleNumInput={handleNumInput} newName={newName} newNum={newNum} />
      <h2>Numbers</h2>
      <Persons persons={persons} deletePerson={deletePerson} />
    </div>
  )
}

export default App