import { Button } from '@mui/material'

const Language = (props) => {
  const { languages } = props
  const languagesValue = Object.values(languages)
  return (
    <ul>
      {languagesValue.map((value) => (
        <li key={value}>{value}</li>
      ))}
    </ul>
  )
}

export const Flag = ({ flags, name, flagWidth }) => {
  return <img src={flags.svg} style={{ width: flagWidth }} alt={name} />
}

const Weather = ({ weather }) => {
  const src = `http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`
  return (
    <div>
      temperature {(weather.main.temp - 273.15).toFixed(2)} Celsius
      <br />
      <img src={src} alt={weather.weather.description} />
      <br />
      wind {weather.wind.speed} m/s
    </div>
  )
}

const Country = ({
  name,
  capital,
  area,
  languages,
  flags,
  weather,
  backButton,
}) => {
  const flagWidth = 200
  return (
    <div>
      <h1>{name}</h1>
      Capitlal: {capital} <br />
      Area: {area} <br />
      <br />
      <h2>Languages:</h2>
      <Language languages={languages} />
      <Flag flags={flags} name={name} flagWidth={flagWidth} />
      <h2>Weather in {capital ? capital : name}</h2>
      {weather ? <Weather capital={capital} weather={weather} /> : null}
      <Button
        onClick={() => backButton()}
        variant="contained"
        sx={{ mt: 2 }}
        size="small"
      >
        Back to list
      </Button>
    </div>
  )
}

export default Country

