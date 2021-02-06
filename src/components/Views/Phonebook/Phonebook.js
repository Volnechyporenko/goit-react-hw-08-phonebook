import { useEffect, useMemo } from 'react';
import { connect } from 'react-redux';
import Form from '../../Form/Form';
import Search from '../../Search/Search';
import ContactList from '../../ContactList/ContactList';
import { setFilter } from '../../../redux/phonebook/phonebook-actions';
import {
  fetchContact,
  addContact,
  deleteContact,
} from '../../../redux/phonebook/phonebook-operations';
import {
  getContacts,
  getFilter,
} from '../../../redux/phonebook/phonebook-selectors';
import { getUsername } from '../../../redux/auth/authSelectors';
import authOperation from '../../../redux/auth/authOperation';

import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  button: {
    margin: theme.spacing(1),
  },
}));

const Phonebook = ({
  contacts,
  filter,
  addContact,
  setFilter,
  deleteContact,
  fetchContact,
  userName,
  logout,
}) => {
  const classes = useStyles();

  useEffect(() => {
    fetchContact();
  }, []);

  const onAddContact = newContact => {
    const existedContact = contacts.find(
      contact => contact.name === newContact.name,
    );
    if (existedContact) {
      alert('Такой контакт уже есть!');
      return;
    }
    addContact(newContact);
  };

  const getFilteredContacts = () =>
    contacts.filter(contact => {
      return contact.name
        .toLocaleLowerCase()
        .includes(filter.toLocaleLowerCase());
    });

  const filteredContacts = useMemo(() => getFilteredContacts(), [
    contacts,
    filter,
  ]);
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Grid container>
          <Grid item xs>
            <Avatar className={classes.avatar}>
              <AccountCircleIcon />
            </Avatar>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              color="secondary"
              className={classes.button}
              startIcon={<ExitToAppIcon />}
              onClick={logout}
            />
          </Grid>
        </Grid>

        <Typography component="h1" variant="h5">
          Phonebook {userName}
        </Typography>
        <Form onSubmit={onAddContact} />
        {contacts.length > 0 && (
          <>
            <Typography component="h2" variant="h5">
              Contacts
            </Typography>
            <Search onChange={setFilter} filter={filter} />
            {filteredContacts.length > 0 ? (
              <ContactList
                contacts={filteredContacts}
                onDelete={deleteContact}
              />
            ) : (
              <span>Contacts is not found</span>
            )}
          </>
        )}
        {!contacts.length && <span>No contacts yet. Add contacts</span>}
      </div>
    </Container>
  );
};

const mapStateToProps = state => ({
  contacts: getContacts(state),
  filter: getFilter(state),
  userName: getUsername(state),
});

const mapDispatchToProps = dispatch => ({
  fetchContact: () => dispatch(fetchContact()),
  addContact: newContact => dispatch(addContact(newContact)),
  setFilter: filter => dispatch(setFilter(filter)),
  deleteContact: id => dispatch(deleteContact(id)),
  logout: () => dispatch(authOperation.logout()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Phonebook);
