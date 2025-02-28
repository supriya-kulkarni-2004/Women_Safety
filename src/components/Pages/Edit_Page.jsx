import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

function Edit_Page() {

  const navigate = useNavigate();
  const [emergencyContacts, setEmergencyContacts] = useState([]);

  useEffect(() => {
    const storedContacts = JSON.parse(localStorage.getItem("contacts")) || [];
    setEmergencyContacts(storedContacts);
  }, []);

  return (
    <div>
      
      <div className="absolute w-full flex items-center justify-center gap-4 p-6">
        <button
          onClick={() => {}} className="focus:outline-none text-white bg-red-700 hover:bg-red-800 font-bold rounded-lg text-2xl px-10 py-5 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
        >
          Edit Emergency Contacts
        </button>
      </div>

      <div className="absolute w-full  gap-4 p-6">
        <button
          onClick={() => {navigate("/Add_Emergency_Contacts")}} className="focus:outline-none text-white bg-red-700 hover:bg-red-800 font-bold rounded-lg text-2xl px-10 py-5 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">
          Add Emergency Contacts
        </button>
      </div>

       {/* Display Saved Contacts */}
       <div className="mt-40 ml-140 text-center absolute">
        <h2 className="text-3xl font-bold mb-4">Saved Emergency Contacts</h2>
        <ul className="text-xl">
          {emergencyContacts.length > 0 ? (
            emergencyContacts.map((contact, index) => (
              <li key={index} className="mb-2">
                <strong>{contact.name}:</strong> {contact.phone}
              </li>
            ))
          ) : (
            <p>No contacts saved yet.</p>
          )}
        </ul>
       </div>  

    </div>

  
  )
}

export default Edit_Page
