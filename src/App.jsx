import { useEffect, useState } from 'react';

import { Notify } from 'notiflix/build/notiflix-notify-aio';

import { ContactForm } from './components/ContactForm/ContactForm';
import { Filter } from './components/Filter/Filter';
import { ContactList } from './components/ContactList/ContactList';

import css from './App.module.css';

export function App() {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');

  const addNewContact = newContact => {
    const contactCheck = contacts.some(
      contact => contact.number === newContact.number
    );

    if (!contactCheck) {
      const allContact = [...contacts, newContact];
      setContacts(allContact);
      localStorage.setItem('contacts', JSON.stringify(allContact));
      Notify.success('Great! Contact has been added');
    } else {
      Notify.failure('There is a contact for this number in the phone book');
    }
  };

  const handleFilter = inputValue => {
    setFilter(inputValue);
  };

  const searchContact = () => {
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  useEffect(() => {
    const storedContacts = JSON.parse(localStorage.getItem('contacts'));
    if (storedContacts) {
      setContacts(storedContacts);
    }
  }, []);

  const deleteContact = contactId => {
    const updateContacts = contacts.filter(contact => contact.id !== contactId);
    setContacts(updateContacts);
    localStorage.setItem('contacts', JSON.stringify(updateContacts));
    Notify.info('Contact has been removed');
  };

  return (
    <div className={css.container}>
      <div className={css.container__box}>
        <ContactForm addNewContact={addNewContact} />
      </div>
      <div className={css.container__box}>
        <Filter handleFilter={handleFilter} />
        <ContactList contacts={searchContact()} deleteContact={deleteContact} />
      </div>
    </div>
  );
}
