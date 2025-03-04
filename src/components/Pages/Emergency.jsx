import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';


const Emergency = () => {

  const navigate = useNavigate();
  const [emergencyContacts, setEmergencyContacts] = useState([]);

  useEffect(() => {
      const storedContacts = JSON.parse(localStorage.getItem("contacts")) || [];
      setEmergencyContacts(storedContacts);
    }, []);
  
  return (
    <div>
      
      <div className="mt-10 flex flex-col space-y-4 w-full px-4">
        <p
          className="font-bold text-lg cursor-pointer"
          onClick={() => navigate(-1)}
        >Back</p>
      </div>
      <div className="mt-10 flex flex-col items-center space-y-4 w-full px-4">
      {emergencyContacts.length > 0 ? (
        emergencyContacts.map((contact, index) => (
          <div
            key={index}
            className="bg-white shadow-lg rounded-lg p-4 w-full max-w-sm flex justify-between items-center"
          >
            <div>
              <h3 className="text-xl font-bold">{contact.name}</h3>
              <p className="text-gray-600">{contact.phone}</p>
            </div>
            <button className='px-4 py-2 bg-green-500 text-white rounded'>Call</button>
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
