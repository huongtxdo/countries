import lodash from 'lodash'
import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'

import { Typography, Box, Grid, Button, Alert } from '@mui/material'
import { ThemeProvider, createTheme } from '@mui/material/styles'

import Notification from './Notification'

const CapitalQuiz = ({ countries }) => {
  const [subCountries, setSubCountries] = useState([])
  const [country, setCountry] = useState([])
  const [capital, setCapital] = useState([])
  const [selectedCountry, setSelectedCountry] = useState(null)
  const [selectedCapital, setSelectedCapital] = useState(null)
  const [win, setWin] = useState(false)

  // states for notifications
  const [errorMessage, setErrorMessage] = useState(false)
  const [message, setMessage] = useState(null)

  // states for re-rendering the page when clicking on the Quiz button on nav bar
  const location = useLocation()
  useEffect(() => {
    setSubCountries(lodash.sampleSize(countries, 2))
    setCountry([])
    setCapital([])
    setSelectedCountry(null)
    setSelectedCapital(null)
    setWin(false)
  }, [countries, location])

  // function for changing message and errorMessage
  const notiChange = (message, errorMessage) => {
    var timer
    const startTimer = () =>
      (timer = setTimeout(() => {
        setMessage(null)
        setErrorMessage(false)
      }, 3000))

    setMessage(message)
    setErrorMessage(errorMessage)

    clearTimeout(timer)
    startTimer()
  }

  // initializing random countries array
  useEffect(() => {
    if (countries) {
      setSubCountries(lodash.sampleSize(countries, 2))
    }
  }, [countries])

  // initializing country and capital array
  useEffect(() => {
    const nameList = []
    subCountries.forEach((country) => {
      nameList.push(country.name.common)
    })
    setCountry(lodash.shuffle(nameList))
    setCapital(
      subCountries.map((country) =>
        country.capital ? country.capital[0] : country.name.common
      )
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [subCountries])

  // checking selection and win condition
  useEffect(() => {
    if (selectedCountry && selectedCapital) {
      const countryFromSubCountries = subCountries.find(
        (country) => country.name.common === selectedCountry
      )
      const correctCapital = countryFromSubCountries.capital
        ? countryFromSubCountries.capital[0]
        : countryFromSubCountries.name.common
      if (selectedCapital === correctCapital) {
        const updatedSubCountries = subCountries.filter(
          (country) => country.name.common !== selectedCountry
        )
        notiChange(
          `Correct! ${selectedCapital} is the capital of ${selectedCountry}.`,
          false
        )
        if (updatedSubCountries.length === 0) setWin(true)
        setSubCountries(updatedSubCountries)
      } else {
        notiChange(
          `${selectedCapital} is not the capital of ${selectedCountry}.`,
          true
        )
      }
      setSelectedCapital(null)
      setSelectedCountry(null)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCapital, selectedCountry])

  // styling for Box
  const boxSx = {
    marginTop: 3,
    marginBottom: 1,
    display: 'flex',
    flexDirection: 'column',
  }

  if (!subCountries || !country || !capital) return <></>
  if (win) {
    return (
      <Box sx={boxSx}>
        <Notification message={message} errorMessage={errorMessage} />
        <Alert severity="success" sx={{ marginTop: 3 }}>
          <strong>Well done!</strong>
        </Alert>
        <Button
          onClick={() => {
            setMessage(null)
            setErrorMessage(false)
            setSubCountries(lodash.sampleSize(countries, 2))
            setWin(false)
          }}
        >
          New round?
        </Button>
      </Box>
    )
  }

  const countryClicked = (newCountry) => {
    setSelectedCountry(newCountry)
  }

  const capitalClicked = (newCapital) => {
    setSelectedCapital(newCapital)
  }

  return (
    <Box sx={boxSx}>
      <Notification message={message} errorMessage={errorMessage} />
      <Typography component="h1" variant="h4" sx={{ marginBottom: 3 }}>
        Country capital quiz
      </Typography>
      <Grid
        container
        direction="row"
        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
        justifyContent="space-between"
        wrap="nowrap"
      >
        <ThemeProvider theme={theme}>
          <Grid item xs={6}>
            <Grid container rowSpacing={1}>
              {country &&
                country.map((name) => (
                  <Grid key={name} item xs={12}>
                    <Button
                      key={name}
                      onClick={() => countryClicked(name)}
                      variant="contained"
                      sx={{
                        backgroundColor:
                          selectedCountry === name
                            ? 'countryMain'
                            : 'countryLight',
                        color: 'black',
                      }}
                    >
                      {name}
                    </Button>
                  </Grid>
                ))}
            </Grid>
          </Grid>
          <Grid item xs={6} align="right">
            <Grid container rowSpacing={1}>
              {capital &&
                capital.map((capital) => (
                  <Grid key={capital} item xs={12}>
                    <Button
                      key={capital}
                      onClick={() => capitalClicked(capital)}
                      variant="contained"
                      sx={{
                        backgroundColor:
                          selectedCapital === capital
                            ? 'capitalMain'
                            : 'capitalLight',
                        color: 'black',
                      }}
                    >
                      {capital}
                    </Button>
                  </Grid>
                ))}
            </Grid>
          </Grid>
        </ThemeProvider>
      </Grid>
    </Box>
  )
}

let theme = createTheme({
  palette: {
    countryLight: '#f5e9c9',
    countryMain: '#fad264',
    capitalLight: '#F5EBFF',
    capitalMain: '#E0C2FF',
  },
})

export default CapitalQuiz

