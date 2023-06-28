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
    <>
      <p key={props.person.name}>{props.person.name} {props.person.number}</p>
    </>
  )
}

const Persons = (props) => {
  return (
    <>
      {props.persons.map(person => 
        <Person key={person.name} person={person} />
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
      alert(`${newName} is already added to phonebook`)
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

  return (
    <div>
      <h2>Phonebook</h2>
      <PersonForm addPerson={addPerson} handleNameInput={handleNameInput} handleNumInput={handleNumInput} newName={newName} newNum={newNum} />
      <h2>Numbers</h2>
      <Persons persons={persons} />
    </div>
  )
}

export default App