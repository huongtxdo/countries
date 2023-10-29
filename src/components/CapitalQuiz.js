import lodash from 'lodash'
import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'

import { Typography, Box, Grid, Button, Alert, Slider } from '@mui/material'
import { ThemeProvider, createTheme } from '@mui/material/styles'

import Notification from './Notification'
import QuizButtons from './QuizButtons'

const CapitalQuiz = ({ countries }) => {
  const [difficulty, setDifficulty] = useState(2)
  const [subCountries, setSubCountries] = useState([])
  const [country, setCountry] = useState([])
  const [capital, setCapital] = useState([])
  const [selectedCountry, setSelectedCountry] = useState(null)
  const [selectedCapital, setSelectedCapital] = useState(null)
  const [win, setWin] = useState(false)

  // states for notifications
  const [severity, setSeverity] = useState('info')
  const [message, setMessage] = useState(
    'Select the correct capital for each country'
  )

  // states for re-rendering the page when clicking on the Quiz button on nav bar
  const location = useLocation()
  useEffect(() => {
    setSubCountries(lodash.sampleSize(countries, difficulty))
    setCountry([])
    setCapital([])
    setSelectedCountry(null)
    setSelectedCapital(null)
    setWin(false)
  }, [countries, location])

  // function for changing message and severity
  const notiChange = (message, severity) => {
    var timer
    const startTimer = () =>
      (timer = setTimeout(() => {
        setMessage('Select the correct capital for each country')
        setSeverity('info')
      }, 3000))

    setMessage(message)
    setSeverity(severity)

    clearTimeout(timer)
    startTimer()
  }

  // initializing random countries array
  useEffect(() => {
    if (countries) {
      setSubCountries(lodash.sampleSize(countries, difficulty))
    }
  }, [countries, difficulty])

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
        const updatedCountryList = country.filter((c) => c !== selectedCountry)
        const updatedCapitalList = capital.filter((c) => c !== selectedCapital)
        notiChange(
          `Correct! ${selectedCapital} is the capital of ${selectedCountry}.`,
          'success'
        )
        if (updatedCountryList.length === 0) setWin(true)
        setCountry(updatedCountryList)
        setCapital(updatedCapitalList)
      } else {
        notiChange(
          `${selectedCapital} is not the capital of ${selectedCountry}.`,
          'error'
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

  const renderWinPage = () => (
    <Box sx={boxSx}>
      <Notification message={message} severity={severity} />
      <Alert severity="success" sx={{ marginTop: 3 }}>
        <strong>Well done!</strong>
      </Alert>
      <Typography variant="h6">Difficulty?</Typography>
      <Slider
        aria-label="difficulty"
        onChange={({ target }) => setDifficulty(Number(target.value))}
        value={difficulty}
        valueLabelDisplay="auto"
        marks
        step={1}
        min={2}
        max={15}
      />
      <Button
        onClick={() => {
          setMessage('Select the correct capital for each country')
          setSeverity('info')
          setSubCountries(lodash.sampleSize(countries, difficulty))
          setWin(false)
        }}
      >
        New round
      </Button>
    </Box>
  )

  if (!subCountries || !country || !capital) return <></>
  if (win) return renderWinPage()

  return (
    <Box sx={boxSx}>
      <Typography component="h1" variant="h4" sx={{ marginBottom: 1 }}>
        Country capital quiz
      </Typography>
      <Notification message={message} severity={severity} />
      <Grid
        container
        direction="row"
        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
        justifyContent="space-between"
        wrap="nowrap"
      >
        <ThemeProvider theme={theme}>
          <Grid item xs={6}>
            <QuizButtons
              countryOrCapital={country}
              selected={selectedCountry}
              setSelected={setSelectedCountry}
              mainColor={'countryMain'}
              lightColor={'countryLight'}
            />
          </Grid>
          <Grid item xs={6} align="right">
            <QuizButtons
              countryOrCapital={capital}
              selected={selectedCapital}
              setSelected={setSelectedCapital}
              mainColor={'capitalMain'}
              lightColor={'capitalLight'}
            />
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

