import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'

import {
  AppBar,
  Box,
  Container,
  Toolbar,
  Typography,
  Button,
} from '@mui/material'

import CapitalQuiz from './components/CapitalQuiz'
import HomePage from './components/CountrySearch'

const App = () => {
  const [countries, setCountries] = useState([])

  useEffect(() => {
    axios.get('https://restcountries.com/v3.1/all').then((response) => {
      setCountries(response.data)
    })
  }, [])

  return (
    <Container component="main" maxWidth="xs">
      <Router>
        <AppBar position="static">
          <Toolbar>
            <Button color="inherit" component={Link} to="/">
              home
            </Button>
            <Button color="inherit" component={Link} to="/SearchCountry">
              Search
            </Button>
            <Button color="inherit" component={Link} to="/CapitalQuiz">
              Quiz
            </Button>
          </Toolbar>
        </AppBar>
        <Routes>
          <Route
            path="/SearchCountry"
            element={<HomePage countries={countries} />}
          />
          <Route
            path="/CapitalQuiz"
            element={<CapitalQuiz countries={countries} />}
          />
          <Route
            path="/"
            element={
              <Typography component="h1" variant="h4" sx={{ marginBlock: 2 }}>
                Country app
              </Typography>
            }
          />
        </Routes>
      </Router>
    </Container>
  )
}

export default App

