import React, { useEffect, useState } from 'react'

const Emergency = () => {

  const [emergencyContacts, setEmergencyContacts] = useState([]);

  useEffect(() => {
      const storedContacts = JSON.parse(localStorage.getItem("contacts")) || [];
      setEmergencyContacts(storedContacts);
    }, []);
  
  return (
    <div>
      
      <div className="mt-10 flex flex-col items-center space-y-4">
      {emergencyContacts.length > 0 ? (
        emergencyContacts.map((contact, index) => (
          <div
            key={index}
            className="bg-white shadow-lg rounded-lg p-4 w-80 text-center"
          >
            <h3 className="text-xl font-bold">{contact.name}</h3>
            <p className="text-gray-600">{contact.phone}</p>
          </div>
        ))
      ) : (
        <p className="text-gray-500 text-lg">No contacts saved yet.</p>
      )}
    </div>

    </div>
  )
}

export default Emergency
