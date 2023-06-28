import { useState, useEffect } from 'react'
import personService from './services/persons'
import './index.css'

const PersonForm = ({ addPerson, handleNameInput, handleNumInput, newName, newNum }) => {
  return (
    <form onSubmit={addPerson}>
      <div>name: <input value={newName} onChange={handleNameInput} /></div>
      <div>number: <input value={newNum} onChange={handleNumInput} /></div>
      <div><button type="submit">add</button></div>
    </form>
  )
}

const Person = ({ person, deletePerson }) => {
  return(
    <div key={person.name}>
      {person.name} {person.number}
      <button onClick={deletePerson}>Delete</button>
    </div>
  )
}

const Persons = ({ persons, deletePerson }) => {
  return (
    <>
      {persons.map(person => 
        <Person 
          key={person.name} 
          person={person} 
          deletePerson={() => deletePerson(person.id)} 
        />
      )}
    </>
  )
}

const Alert = ({ message, alertIsError }) => {
  if (message === null) {
    return null
  } else if (alertIsError) {
    return (
      <div className='alert error'>
        {message}
      </div>
    )
  } else {
    return (
      <div className='alert'>
        {message}
      </div>
    )
  }
}

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNum, setNewNum] = useState('')
  const [alertMessage, setAlertMessage] = useState(null)
  const [alertIsError, setAlertIsError] = useState(false)

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
            setAlertMessage(`Updated ${returnedPerson.name}`)
            setTimeout(() => {setAlertMessage(null)}, 5000)
            setPersons(persons.map(person => person.id !== changedPerson.id ? person : returnedPerson))
            setNewName('')
            setNewNum('')
          })
          .catch(error => {
            setAlertMessage(`Information of ${changedPerson.name} has already been removed from server`)
            setAlertIsError(true)
            setTimeout(() => {
              setAlertMessage(null)
              setAlertIsError(false)
            }, 5000)
            setPersons(persons.filter(person => person.id !== changedPerson.id))
            setNewName('')
            setNewNum('')
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
          setAlertMessage(`Added ${returnedPerson.name}`)
          setTimeout(() => {setAlertMessage(null)}, 5000)
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
      <Alert message={alertMessage} alertIsError={alertIsError} />
      <h2>Phonebook</h2>
      <PersonForm addPerson={addPerson} handleNameInput={handleNameInput} handleNumInput={handleNumInput} newName={newName} newNum={newNum} />
      <h2>Numbers</h2>
      <Persons persons={persons} deletePerson={deletePerson} />
    </div>
  )
}

export default App