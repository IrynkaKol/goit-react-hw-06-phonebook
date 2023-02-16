import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import { Container } from './App.styled';
import ContactForm from '../ContactForm/ContactForm';
import ContactList from '../ContactList/ContactList';
import Filter from '../Filter/Filter';
import Section from '../Section/Section';


export function App() {
  const [contacts, setContacts] = useState(
    () => JSON.parse(localStorage.getItem('contacts')) ?? []
  );
  const [filter, setFilter] = useState('');

  const formSubmitHandler = ({ name, number }) => {
    if (
      !contacts.find(
        contact => contact.name.toLowerCase() === name.toLowerCase()
      )
    ) {
      setContacts(prevState => [{ id: nanoid(), name, number }, ...prevState]);
    } else {
      alert(`${name} is already in contacts.`);
    }
  };

  const changeFilter = e => {
    setFilter(e.currentTarget.value);
  };

  const deleteContacts = contactId => {
    setContacts(prevState =>
      prevState.filter(contact => contact.id !== contactId)
    );
  };

  useEffect(() => {
    const contacts = localStorage.getItem('contacts');
    const parseContacts = JSON.parse(contacts);
    if (parseContacts) {
      setContacts(parseContacts);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const getVisibleContacts = () => {
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  const visibleContacts = getVisibleContacts();
  return (
    <Container>
      <Section title="Phonebook">
        <ContactForm onSubmit={formSubmitHandler} />
      </Section>
      <Section title="Contacts">
        <Filter value={filter} onChange={changeFilter} />
        <ContactList
          contacts={visibleContacts}
          onDeleteContacts={deleteContacts}
        />
      </Section>
    </Container>
  );
}


/*
export class OldApp extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  formSubmitHendler = data => {
    const contact = {
      id: nanoid(),
      name: data.name,
      number: data.number,
    };
    if (
      !this.state.contacts.find(
        ({ name }) => name.toLowerCase() === data.name.toLowerCase()
      )
    ) {
      this.setState(prevState => ({
        contacts: [contact, ...prevState.contacts],
      }));
    } else {
      alert(`${data.name} is already in contacts.`);
    }
    //console.log(data);
    //console.log(contact);
  };

  deleteContacts = e => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== e),
    }));
  };

  changeFilter = e => {
    this.setState({ filter: e.currentTarget.value });
  };

  getVisibleContacts = () => {
    const normalizedFilter = this.state.filter.toLowerCase();
    return this.state.contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  componentDidMount() {
    console.log('App component DidMount');
    const contacts = localStorage.getItem('contacts');
    const parseContacts = JSON.parse(contacts);
    if (parseContacts) {
      this.setState({ contacts: parseContacts });
    }
    //console.log(parseContacts)
  }
  componentDidUpdate(_, prevState) {
    console.log('App component DidUpdate');
    if (this.state.contacts !== prevState.contacts) {
      console.log('Оновились контакти, записуємо їх до сховища');
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
    }
    

  render() {
    const visibleContacts = this.getVisibleContacts();
    return (
      <Container>
        <Section title="Phonebook">
          <ContactForm onSubmit={this.formSubmitHendler} />
        </Section>
        <Section title="Contacts">
          <Filter value={this.state.filter} onChange={this.changeFilter} />
          <ContactList
            contacts={visibleContacts}
            onDeleteContacts={this.deleteContacts}
          />
        </Section>
      </Container>
    );
  }
}*/
