import { useState } from 'react';
import { v4 as uuid } from 'uuid';
import PropTypes from 'prop-types';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import MuiPhoneNumber from 'material-ui-phone-number';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const Form = ({ onSubmit }) => {
  const classes = useStyles();

  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const handleChangeName = evt => {
    const { value } = evt.currentTarget;
    setName(value);
  };

  const handleChangePhone = phone => {
    console.log('phone', phone);
    const clearNumber = phone.replace('+', '');
    setNumber(clearNumber);
  };

  const handleSubmit = event => {
    event.preventDefault();
    onSubmit({
      id: uuid(),
      name,
      number,
    });
    setName('');
    setNumber('');
  };

  return (
    <form className={classes.form} noValidate onSubmit={handleSubmit}>
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        id="name"
        label="Name"
        name="name"
        autoComplete="name"
        autoFocus
        onChange={handleChangeName}
      />
      <MuiPhoneNumber
        variant="outlined"
        margin="normal"
        required
        fullWidth
        name="number"
        label="Phone Number"
        data-cy="user-phone"
        defaultCountry={'ua'}
        value={number}
        onChange={handleChangePhone}
      />
      <Button
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
        className={classes.submit}
      >
        Add Contact
      </Button>
    </form>
  );
};

Form.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default Form;
