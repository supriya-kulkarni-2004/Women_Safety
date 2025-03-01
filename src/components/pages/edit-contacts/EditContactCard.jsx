import React, { useEffect, useState } from "react";
import { getContacts, updateContact, deleteContact } from "../../utility/StorageService";
import buttonStyles from "../../buttons/ButtonStyles";
import AddContactForm from "../add-contact/AddContactForm";
import EditContactCard from "./EditContactCard";

function EditContacts() {
  const [contacts, setContacts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingContact, setEditingContact] = useState(null);

  useEffect(() => {
    setContacts(getContacts() || []);
  }, []);

  const refreshContacts = () => {
    setContacts(getContacts());
  };

  const handleEdit = (contact) => {
    setEditingContact(contact);
  };

  const handleCloseEdit = () => {
    setEditingContact(null);
  };

  const handleDelete = (phoneNumber) => {
    const confirmDelete = window.confirm("Do you want to delete this contact?");
    if (confirmDelete) {
      deleteContact(phoneNumber);
      alert("Contact deleted successfully!");
      refreshContacts();
    }
  };

  return (
    <>
      <div className="p-6 flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold">Edit Contacts</h2>
        <button
          className={buttonStyles.editEmergencyContacts}
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? "Close" : "Add Contact"}
        </button>
      </div>

      {showForm && <AddContactForm onClose={() => setShowForm(false)} onUpdate={refreshContacts} />}

      {contacts.length > 0 ? (
        <div className="p-4 flex flex-col gap-4">
          {contacts.map((contact) =>
            editingContact?.phoneNumber === contact.phoneNumber ? (
              // Render `EditContactCard` separately, avoiding shadow
              <EditContactCard
                key={contact.phoneNumber}
                contact={editingContact}
                onClose={handleCloseEdit}
                onUpdate={refreshContacts}
              />
            ) : (
              // Normal Contact Card with shadow
              <div key={contact.phoneNumber} className="p-4 rounded-lg shadow-lg">
                <div className="flex items-center justify-between">
                  <div className="p-4 border rounded-lg">
                    <h3 className="text-lg font-semibold">{contact.name}</h3>
                    <p className="text-gray-600">{contact.phoneNumber}</p>
                  </div>
                  <div className="flex gap-4">
                    <button
                      className="bg-blue-500 text-white p-2 rounded-lg"
                      onClick={() => handleEdit(contact)}
                    >
                      Edit
                    </button>
                    <button
                      className="bg-red-500 text-white p-2 rounded-lg"
                      onClick={() => handleDelete(contact.phoneNumber)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            )
          )}
        </div>
      ) : (
        <p className="text-gray-500 p-4">No contacts available.</p>
      )}
    </>
  );
}

export default EditContacts;
