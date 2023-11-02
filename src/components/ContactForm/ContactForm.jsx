import PropTypes from 'prop-types';

import { nanoid } from 'nanoid';

import css from './ContactForm.module.css';

export function ContactForm({ addNewContact }) {
  const handleSubmit = evt => {
    evt.preventDefault();

    const newContact = {
      id: nanoid(),
      name: evt.target.name.value,
      number: evt.target.number.value,
    };

    addNewContact(newContact);

    evt.target.name.value = '';
    evt.target.number.value = '';
  };

  return (
    <form className={css.form} onSubmit={handleSubmit}>
      <div className={css.form__side}>
        <h1 className={css.form__title}>Phonebook</h1>
      </div>
      <div className={css.form__side}>
        <div className={css.form__group}>
          <input
            className={css.form__input}
            type="text"
            name="name"
            placeholder="Imie i Nazwisko"
            //pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
          />
        </div>
        <div className={css.form__group}>
          <input
            className={css.form__input}
            type="tel"
            name="number"
            placeholder="123 123 123"
            //pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
          />
        </div>
        <div className={css.form__group}>
          <button type="submit" className={css.form__button}>
            Add Contact
          </button>
        </div>
      </div>
    </form>
  );
}

ContactForm.propTypes = {
  addNewContact: PropTypes.func,
};
