import  { useEffect, useState } from "react";
import { getListContact, deleteContact } from "../LocalStroge/SaveData";
import { useNavigate } from 'react-router-dom';

export default function ListOfContact (){

  const [contacts, setContacts] = useState([]);
  const navigate = useNavigate();


  // Fetch the list of contacts when the component mounts
  useEffect(() => {
    const contactList = getListContact();
    setContacts(contactList);
  }, []);

  const removeContact = (id) => {
    deleteContact(id); // Delete the contact with the specified id
    setContacts((prevContacts) => prevContacts.filter((contact) => contact.id !== id));// Update the state to reflect the deleted contact
  };

  return (
    <>
      <h1>ContactList</h1>
      <button className="btn" onClick={() => navigate(`/`)}>Back</button>
      {contacts.length > 0 ? (
        <div className="posts-div">
          {contacts.map((contact, id) => (
            <div className="post-data" key={id}>
              <h4 className="name">Name: {contact.name}</h4>
              <p className="phone-number">Number: {contact.number}</p>
              <button className="update-btn" onClick={() => navigate(`/edit-user/${contact.id}`)}>Update</button>
              <button className="delete-btn" onClick={() => removeContact(contact.id)}>Delete</button> 
            </div>
          ))}
        </div>
      ) : (
        <p style={{ textAlign: 'center' }}>No Contact Here</p>
      )}
    </>
  );
}