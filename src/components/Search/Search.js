import PropTypes from 'prop-types';
import SearchIcon from '@material-ui/icons/Search';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';

const Search = ({ onChange, filter }) => {
  const handleChange = event => {
    const value = event.currentTarget.value;
    onChange(value);
  };

  return (
    <TextField
      variant="outlined"
      margin="normal"
      required
      fullWidth
      type="text"
      id="filter"
      label="Find contacts by name"
      name="filter"
      value={filter}
      autoFocus
      onChange={handleChange}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        ),
      }}
    />
  );
};

Search.propTypes = {
  filter: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default Search;
