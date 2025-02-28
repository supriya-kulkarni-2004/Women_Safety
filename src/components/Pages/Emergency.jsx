import React, { useEffect, useState } from 'react'
import buttonStyles from '../buttons/ButtonStyles';

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
        <h2 className="text-3xl font-bold mb-4">Saved Emergency Contacts</h2>
        <ul className="text-xl">
          {emergencyContacts.length > 0 ? (
            emergencyContacts.map((contact, index) => (
              <li key={index} className="mb-2">
                <button className={buttonStyles.emergencyButton}><strong>{contact.name}</strong></button>
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
