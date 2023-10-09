import { TextField } from '@mui/material'

const SearchCountries = ({searchName, handleSearchName}) => (
    <form>
      <div>
        <TextField label="Enter country's name" value={searchName} onChange={handleSearchName} />
      </div>
    </form>
  );
  
  export default SearchCountries;