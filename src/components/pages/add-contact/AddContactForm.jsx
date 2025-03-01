import React, { useState } from "react";
import { saveContact, getContacts } from "../../utility/StorageService"; // Ensure getContacts is imported

function AddContactForm({ onClose, onUpdate }) {
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  // Function to handle saving the contact
  const handleSave = () => {
    if (!name || !phoneNumber) {
      alert("Please fill out both fields.");
      return;
    }

    // Retrieve existing contacts from storage
    const existingContacts = getContacts() || [];

    // Check if phone number already exists
    const isDuplicate = existingContacts.some(
      (contact) => contact.phoneNumber === phoneNumber
    );

    if (isDuplicate) {
      alert("Phone number already exists!");
      return; // Stop further execution, keeping the form open
    }

    // If no duplicate, proceed with saving the contact
    const newContact = { name, phoneNumber };
    saveContact(newContact);
    alert("Contact added successfully!");

    onUpdate(); // Refresh contact list in parent

    // Reset fields and close form
    setName("");
    setPhoneNumber("");
    onClose();
  };

  // Function to handle discarding a contact
  const handleDiscard = () => {
    if (!name && !phoneNumber) {
      onClose();
    } else {
      const confirmDiscard = window.confirm(
        "Do you want to discard this contact?"
      );
      if (confirmDiscard) {
        alert("Contact discarded successfully!");
        onClose();
      }
    }
  };

  return (
    <div className="flex justify-center p-4">
      <div className="p-5 flex flex-col gap-4 border rounded-lg shadow-lg max-w-md mx-auto">
        {/* Input Fields */}
        <div className="flex items-center gap-4 w-full">
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border p-2 w-full mb-2 rounded-lg"
          />
          <input
            type="tel"
            placeholder="Phone Number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            className="border p-2 w-full mb-2 rounded-lg"
            pattern="[0-9]{10}"
            maxLength="10"
            required
          />
        </div>

        {/* Buttons */}
        <div className="flex justify-end w-full gap-4">
          <button
            onClick={handleSave}
            className="bg-blue-500 text-white p-2 rounded-lg"
          >
            Save
          </button>
          <button
            onClick={handleDiscard}
            className="bg-red-500 text-white p-2 rounded-lg"
          >
            Discard
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddContactForm;
