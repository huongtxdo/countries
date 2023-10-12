import lodash from 'lodash'
import { useState, useEffect } from 'react'

import { Typography, Box, Grid, Button, Alert } from '@mui/material'
import { ThemeProvider, createTheme } from '@mui/material/styles'

const CapitalQuiz = ({ countries }) => {
  const [subCountries, setSubCountries] = useState([])
  const [country, setCountry] = useState([])
  const [capital, setCapital] = useState([])
  const [selectedCountry, setSelectedCountry] = useState(null)
  const [selectedCapital, setSelectedCapital] = useState(null)
  const [win, setWin] = useState(false)

  useEffect(() => {
    if (countries) {
      setSubCountries(lodash.sampleSize(countries, 5))
    }
  }, [countries])

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
        if (updatedSubCountries.length === 0) setWin(true)
        setSubCountries(updatedSubCountries)
      } else console.log(`wrong`)
      setSelectedCapital(null)
      setSelectedCountry(null)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCapital, selectedCountry])

  if (!subCountries || !country || !capital) return <></>
  if (win) return <Alert severity="success">Well done!</Alert>

  const countryClicked = (newCountry) => {
    setSelectedCountry(newCountry)
  }

  const capitalClicked = (newCapital) => {
    setSelectedCapital(newCapital)
  }

  return (
    <Box
      sx={{
        marginTop: 3,
        marginBottom: 1,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
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
              {country.map((name) => (
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
              {capital.map((capital) => (
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

