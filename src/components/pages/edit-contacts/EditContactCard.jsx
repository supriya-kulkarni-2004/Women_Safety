import React, { useState, useEffect } from "react";
import { saveContact, updateContact, deleteContact, getContacts } from "../../utility/StorageService";

function EditContactCard({ contact, onClose, onUpdate }) {
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const isEditing = !!contact;

  // Set initial values when editing
  useEffect(() => {
    if (contact) {
      setName(contact.name);
      setPhoneNumber(contact.phoneNumber);
    }
  }, [contact]);

  // Save or update contact with duplicate check
  const handleSave = () => {
    if (!name || !phoneNumber) {
      alert("Please fill out both fields.");
      return;
    }

    // Retrieve existing contacts from storage
    const existingContacts = getContacts() || [];

    // Check if the updated phone number already exists (excluding the current contact being edited)
    const isDuplicate = existingContacts.some(
      (c) => c.phoneNumber === phoneNumber && c.phoneNumber !== contact.phoneNumber
    );

    if (isDuplicate) {
      alert("Phone number already exists!");
      return; // Stop execution
    }

    const updatedContact = { name, phoneNumber };
    updateContact(contact.phoneNumber, updatedContact);
    alert("Contact updated successfully!");
    
    onUpdate(); // Refresh contact list
    onClose();
  };

  // Handle deleting a contact
  const handleDelete = () => {
    if (isEditing && window.confirm("Are you sure you want to delete this contact?")) {
      deleteContact(contact.phoneNumber);
      alert("Contact deleted successfully!");
      onUpdate();
      onClose();
    }
  };

  return (
    <div className="flex justify-center p-4">
      <div className="p-5 flex flex-col gap-4 border rounded-lg shadow-lg max-w-md mx-auto">
        {/* Input Fields */}
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2 w-full rounded-lg"
        />
        <input
          type="tel"
          placeholder="Phone Number"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          className="border p-2 w-full rounded-lg"
          pattern="[0-9]{10}"
          maxLength="10"
          required
        />

        {/* Buttons */}
        <div className="flex justify-end w-full gap-4">
          <button onClick={handleSave} className="bg-blue-500 text-white p-2 rounded-lg">
            Save
          </button>
          <button onClick={handleDelete} className="bg-red-500 text-white p-2 rounded-lg">
            Delete
          </button>
          <button onClick={onClose} className="bg-gray-500 text-white p-2 rounded-lg">
            Discard Changes
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditContactCard;
