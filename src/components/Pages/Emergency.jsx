import React, { useEffect, useState } from 'react'

const Emergency = () => {

  const [emergencyContacts, setEmergencyContacts] = useState([]);

  useEffect(() => {
      const storedContacts = JSON.parse(localStorage.getItem("contacts")) || [];
      setEmergencyContacts(storedContacts);
    }, []);
  
  return (
    <div>
      
      {/* Display Saved Contacts */}
      <div className="mt-20 ml-140 text-center absolute">
        <ul className="text-xl">
          {emergencyContacts.length > 0 ? (
            emergencyContacts.map((contact, index) => (
              <li key={index} className="mb-2">
                <button className='focus:outline-none text-white bg-red-700 hover:bg-red-800 font-bold rounded-lg text-1xl px-4 py-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900'><strong>{contact.name}</strong></button>
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

export default Emergency
