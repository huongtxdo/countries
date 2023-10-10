import React, { useEffect, useState } from 'react'
import axios from 'axios'
import SearchCountries from './components/SearchCountries'
import Country from './components/Country'
import Countries from './components/Countries'

import { Container, Box, Typography } from '@mui/material'

const App = () => {
  const [countries, setCountries] = useState([])
  const [searchName, setSearchName] = useState('')
  const [oneCountry, setOneCountry] = useState(null) //checker for Country-component
  const [showCountries, setShowCountries] = useState(true) // checker for Countries-component
  const [searchCountries, setSearchCountries] = useState([])
  const [weather, setWeather] = useState(null)

  useEffect(() => {
    axios.get('https://restcountries.com/v3.1/all').then((response) => {
      setCountries(response.data)
    })
  }, [])

  const handleWeather = (capital) => {
    const api_key = process.env.REACT_APP_API_KEY
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${capital}&APPID=${api_key}`
    axios.get(url).then((response) => {
      setWeather(response.data)
    })
  }

  const handleSearchName = (event) => {
    const input = event.target.value
    setSearchName(input)
    const tempCountries = countries.filter((country) =>
      country.name.common.toLowerCase().includes(input.toLowerCase())
    )
    if (tempCountries.length === 1) {
      setOneCountry(tempCountries[0])
      handleWeather(tempCountries[0].capital)
      setShowCountries(false)
    } else {
      setShowCountries(true)
      setOneCountry(null)
      setSearchCountries(tempCountries)
    }
  }

  const clickShowButton = (country) => {
    setShowCountries(!showCountries)
    setOneCountry(country)
    handleWeather(country.capital)
  }

  const backToCountryList = () => {
    setShowCountries(!showCountries)
    setOneCountry(null)
    handleWeather(null)
  }

  return (
    <Container component="main" maxWidth="xs">
      <Typography component="h1" variant="h4" sx={{ marginBlock: 3 }}>
        Country info
      </Typography>
      <Box
        sx={{
          marginTop: 3,
          marginBottom: 1,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <SearchCountries
          searchName={searchName}
          handleSearchName={handleSearchName}
        />
      </Box>
      {showCountries ? (
        <Countries
          searchName={searchName}
          searchCountries={searchCountries}
          clickShowButton={clickShowButton}
        />
      ) : null}
      {oneCountry ? (
        <Country
          name={oneCountry.name.common}
          capital={oneCountry.capital}
          area={oneCountry.area}
          languages={oneCountry.languages}
          flags={oneCountry.flags}
          weather={weather}
          backButton={backToCountryList}
        />
      ) : null}
    </Container>
  )
}

export default App

