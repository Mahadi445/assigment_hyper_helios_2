import uuid from "react-uuid";

export const getListContact = () => {
    if (!localStorage["FormData"]){
        localStorage["FormData"] = JSON.stringify([]);   
    }
    let contactData = JSON.parse(localStorage["FormData"]);
    return contactData;
};

export const addContact = (contact) =>{
    const contacts = getListContact();
    contacts.push({id: uuid() ,...contact});
    localStorage["FormData"] = JSON.stringify(contacts);
};


export const getListContactId = (id) => {
    let contacts = getListContact();
    let contact = contacts.find((contact) => contact.id === id);
    return contact;
};

export const editContact = (id, newContact) => {
    let contacts = getListContact();
    contacts = contacts.filter((contact) => contact.id !== id);
    contacts.push(newContact);
    localStorage["FormData"] = JSON.stringify(contacts);
};

export const deleteContact =(id)=>{
    let contacts = getListContact();
    contacts = contacts.filter((contact) => contact.id !== id);
    localStorage["FormData"] = JSON.stringify(contacts);
};


