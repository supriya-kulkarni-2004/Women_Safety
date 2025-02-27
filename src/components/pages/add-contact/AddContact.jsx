import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { saveContact, deleteContact } from "../../utility/storageService";

function AddContacts() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  // Function to handle saving the contact
  const handleSave = () => {
    if (!name || !phoneNumber) {
      alert("Please fill out both fields.");
      return;
    }

    const newContact = { name, phoneNumber };
    saveContact(newContact); // Save in localStorage

    console.log("Contact saved:", newContact);
    alert("Contact added successfully!");
    setName(""); 
    setPhoneNumber("");

    navigate("/EditContacts");
  };

  // Function to handle deleting a contact
  const handleDelete = () => {
    if (!phoneNumber) {
      alert("Enter phone number to delete.");
      return;
    }

    const confirmDelete = window.confirm("Do you want to delete this contact?");
    if (confirmDelete) {
      deleteContact(phoneNumber);
      alert("Contact deleted successfully!");
      setPhoneNumber("");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Add Emergency Contact</h2>

      <div>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2 w-full mb-2"
        />
        <input
          type="tel"
          placeholder="Phone Number"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          className="border p-2 w-full mb-4"
          pattern="[0-9]{10}"
          maxLength="10"
          required
        />
      </div>

      <div className="flex gap-4">
        <button
          onClick={handleSave}
          className="bg-blue-500 text-white p-2 rounded"
        >
          Save
        </button>
        <button
          onClick={handleDelete}
          className="bg-red-500 text-white p-2 rounded"
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default AddContacts;
