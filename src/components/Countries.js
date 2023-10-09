import { Alert, List, ListItem, Button,  ListItemIcon } from "@mui/material";

import { Flag } from "./Country";

const Countries = ({searchCountries, clickShowButton, searchName}) => {
  
  if (0 < searchCountries.length && searchCountries.length <= 10) {
    return (
      <List>
        {searchCountries.map((country) => 
          <ListItem disablePadding key={country.name.common} >
            <ListItemIcon>
              <Flag flags={country.flags} name={country.name.common} flagWidth={30}/>
            </ListItemIcon>
            {country.name.common}
            <Button onClick={() => clickShowButton(country)} variant="outlined" sx={{ ml: 2}} size="small">show</Button>
          </ListItem>
        )}
      </List>
    )
  } else if (searchName === "") {
    return (
      <Alert severity="info">Please enter country's name</Alert>
    )
  } else if (searchCountries.length > 10 || searchName === "") {
    return (
      <Alert severity="warning">Too many matches, specify another filter</Alert>
    )
  } 
  return (
    <Alert severity="error">No matches</Alert>
  )
  
};

export default Countries;