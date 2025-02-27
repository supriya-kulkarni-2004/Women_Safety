export const saveContact = (newContact) => {
  let contacts = JSON.parse(localStorage.getItem("contacts")) || [];
  contacts.push(newContact); // Append new contact
  localStorage.setItem("contacts", JSON.stringify(contacts));
  console.log("Updated contacts in localStorage:", contacts);
};

export const getContacts = () => {
  return JSON.parse(localStorage.getItem("contacts")) || [];
};

export const deleteContact = (phoneNumber) => {
  let contacts = getContacts();
  contacts = contacts.filter(contact => contact.phoneNumber !== phoneNumber);
  localStorage.setItem("contacts", JSON.stringify(contacts));
};
