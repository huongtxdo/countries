import { Grid, Button } from '@mui/material'

const QuizButtons = ({
  countryOrCapital,
  selected,
  setSelected,
  mainColor,
  lightColor,
}) => (
  <Grid container rowSpacing={1}>
    {countryOrCapital &&
      countryOrCapital.map((name) => (
        <Grid key={name} item xs={12}>
          <Button
            key={name}
            onClick={() => setSelected(name)}
            variant="contained"
            sx={{
              backgroundColor: selected === name ? mainColor : lightColor,
              color: 'black',
            }}
          >
            {name}
          </Button>
        </Grid>
      ))}
  </Grid>
)

export default QuizButtons

