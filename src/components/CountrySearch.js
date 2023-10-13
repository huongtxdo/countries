import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import axios from 'axios'
import { Box, Typography } from '@mui/material'

import SearchCountries from './SearchCountries'
import Country from './Country'
import Countries from './Countries'

const HomePage = ({ countries }) => {
  const [searchName, setSearchName] = useState('')
  const [oneCountry, setOneCountry] = useState(null) //checker for Country-component
  const [showCountries, setShowCountries] = useState(true) // checker for Countries-component
  const [searchCountries, setSearchCountries] = useState([])
  const [weather, setWeather] = useState(null)

  const location = useLocation()
  useEffect(() => {
    setSearchName('')
    setSearchCountries([])
    setOneCountry(null)
    setWeather(null)
  }, [location])

  const handleWeather = (country) => {
    const api_key = process.env.REACT_APP_API_KEY
    let coords = ``
    if (!country.capital) {
      coords = country.latlng
    } else {
      coords = country.capitalInfo.latlng
    }
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${coords[0]}&lon=${coords[1]}&appid=${api_key}`
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
      handleWeather(tempCountries[0])
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
    handleWeather(country)
  }

  const backToCountryList = () => {
    setShowCountries(!showCountries)
    setOneCountry(null)
    handleWeather(null)
  }

  return (
    <>
      <Box
        sx={{
          marginTop: 3,
          marginBottom: 1,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Typography component="h1" variant="h4" sx={{ marginBottom: 3 }}>
          Country info
        </Typography>
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
    </>
  )
}

export default HomePage

