import ContactItem from './ContactItem/ContactItem';
import PropTypes from 'prop-types';

const ContactList = ({ contacts, onDelete }) => (
  <div>
    {contacts.map(contact => (
      <ContactItem contact={contact} handleClick={onDelete} key={contact.id} />
    ))}
  </div>
);

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({ id: PropTypes.string.isRequired }),
  ).isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default ContactList;
