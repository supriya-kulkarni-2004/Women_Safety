import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getContacts } from "../../utility/storageService"; // Import storage function
import buttonStyles from "../../buttons/ButtonStyles";

function EditContacts() {
  const navigate = useNavigate();
  const [contacts, setContacts] = useState([]);

  // Load contacts from localStorage when component mounts
  useEffect(() => {
    const storedContacts = getContacts() || []; // Ensure it's always an array
    setContacts(storedContacts);
  }, []);

  return (
    <>
      <div className="p-6 flex items-center gap-4">
        <h2 className="text-2xl font-bold">Edit Emergency Contacts</h2>

        <button
          className={buttonStyles.editEmergencyContacts}
          onClick={() => navigate("/AddContact")}
        >
          Add Contact
        </button>
      </div>

      {/* Contact List */}
      {contacts.length > 0 ? (
        <div className="flex flex-col gap-4">
          {contacts.map((contact, index) => (
            <div key={index} className="p-4 border rounded-lg shadow">
              <h3 className="text-lg font-semibold">{contact.name}</h3>
              <p className="text-gray-600">{contact.phoneNumber}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No contacts available.</p>
      )}
    </>
  );
}

export default EditContacts;
