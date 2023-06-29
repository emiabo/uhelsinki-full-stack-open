import { useState, useEffect } from 'react'
import axios from 'axios'

const SearchBar = ({ search, handleSearch }) => {
  return (
    <div>
      find countries (case sensitive)
      <input value={search} onChange={handleSearch} />
    </div>
  )
}

const Results = ({ searchedCountries, oneCountryData }) => {
  console.log(searchedCountries)
  if (searchedCountries.length > 10) {
    return (
      <div>
        Too many matches, specify another filter
      </div>
    )
  } else if (1 < searchedCountries.length && searchedCountries.length <= 10) {
    return (
      <div>
        <ul>
          {searchedCountries.map(country => <li key={country}>{country}</li>)}
        </ul>
      </div>
    )
  } else if (searchedCountries.length === 1) {
    // FIXME oneCountryData.data never initializes
    return (
      <div>
        <h2>{oneCountryData.data.name.common}</h2>
        <div>
          capital {oneCountryData.data.capital[0]}
          area {oneCountryData.data.area}
        </div>
        <h4>languages:</h4>
        <ul>
          {oneCountryData.data.languages.map(language => <li key={language}>{language}</li>)}
        </ul>
        <img src={oneCountryData.data.flags.png} alt={oneCountryData.data.flags.alt} />
      </div>
    )
  } else {
    return (
      <div>
        Enter a valid country name
      </div>
    )
  }
}

function App() {
  const [search, setSearch] = useState('')
  const [countries, setCountries] = useState([])
  const [searchedCountries, setSearchedCountries] = useState([])

  useEffect(() => {
    axios
      .get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(initialCountries => {
        console.log(initialCountries.data.map(country => country.name.common))
        setCountries(initialCountries.data.map(country => country.name.common))
      })
  }, [])

  const handleSearch = (event) => {
    const newSearch = event.target.value
    let newSearchedCountries = []
    console.log(newSearch.length)
    if (newSearch.length === 0) {
      console.log('Emptying searchedCountries')
      newSearchedCountries = []
    } else {
      newSearchedCountries = countries.filter(country => country.startsWith(newSearch)) //CASE SENSITIVE
    }
    setSearchedCountries(newSearchedCountries)
    setSearch(newSearch)
  }

  const getCountryData = (country) => {
    let response = {}
    let countryData = {}
    let countryLanguages = []
    axios
      .get(`https://studies.cs.helsinki.fi/restcountries/api/name/${country}`)
      .then(response => {
        countryData = response.data
        for (const lang in countryData.languages) {
          countryLanguages.concat(countryData.languages[lang])
        }
        response = {
          data: countryData,
          lang: countryLanguages
        }
        console.log(response)
        return response
      })
  }
  
  return (
    <div>
      <SearchBar search={search} handleSearch={handleSearch} />
      <Results searchedCountries={searchedCountries} oneCountryData={() => getCountryData(searchedCountries[0])} />
    </div>
  );
}

export default App;