import React, { useEffect, useState } from 'react'

function Edit_Page() {

  const [emergencyContacts, setEmergencyContacts] = useState([]);
  const [editingContact, setEditingContact] = useState(null);
  const [formData, setFormData] = useState({ name: "", phone: "" });
  const [addingContact, setAddingContact] = useState(false);

  useEffect(() => {
    const storedContacts = JSON.parse(localStorage.getItem("contacts")) || [];
    setEmergencyContacts(storedContacts);
  }, []);

  const handleEdit = (index) => {
    setEditingContact(index);
    setFormData(emergencyContacts[index]);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    let updatedContacts = [...emergencyContacts];

    if (editingContact !== null) {
      updatedContacts[editingContact] = formData;
    } else {
      updatedContacts.push(formData);
    }

    setEmergencyContacts(updatedContacts);
    localStorage.setItem("contacts", JSON.stringify(updatedContacts));

    setEditingContact(null);
    setAddingContact(false);
    setFormData({ name: "", phone: "" });
  };

  const handleDiscard = () => {
    setEditingContact(null);
    setAddingContact(false);
    setFormData({ name: '', phone: '' });
  };

  const handleDelete = (index) => {
    if (confirm("Are you sure you want to delete this contact?")) {
      const updatedContacts = emergencyContacts.filter((_, i) => i !== index);
      setEmergencyContacts(updatedContacts);
      localStorage.setItem('contacts', JSON.stringify(updatedContacts));
    }
  };


  return (
    <div>
      
      <div className="relative w-full flex justify-between p-6">
        <button
          onClick={() => {}} className=" absolute focus:outline-none text-white bg-red-700 hover:bg-red-800 font-bold rounded-lg text-2xl px-8 py-4 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900 absolute top-0 left-0 m-4"
        >
          Edit Emergency Contacts
        </button>

        <button
            onClick={() => setAddingContact(!addingContact)}
            className="absolute focus:outline-none text-white bg-red-700 hover:bg-red-800 font-bold rounded-lg text-2xl px-8 py-4 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900 absolute top-0 right-0 m-4"
          >
            {addingContact ? "CLOSE" : "Add Emergency Contacts"}
          </button>

      </div>

      <div>

        {/* Add Contact Form - Appears when addingContact is true */}
        {addingContact && (
          <div className="mt-12 mb-6 flex flex-col items-center space-y-2 border p-4 rounded-lg bg-gray-100 w-80 mx-auto">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="border p-2 rounded w-full"
              placeholder="Name"
            />
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="border p-2 rounded w-full"
              placeholder="Phone"
            />
            <div className="flex space-x-2">
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-green-500 text-white rounded"
              >
                Save
              </button>
              <button
                onClick={handleDiscard}
                className="px-4 py-2 bg-red-500 text-white rounded"
              >
                Discard
              </button>
            </div>
          </div>
        )}
      </div>
      

      {/* <div className="absolute w-full  gap-4 p-6">
        <button
          onClick={() => {navigate("/Add_Emergency_Contacts")}} className="focus:outline-none text-white bg-red-700 hover:bg-red-800 font-bold rounded-lg text-2xl px-10 py-5 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">
          Add Emergency Contacts
        </button>
      </div> */}

      {/* Display Saved Contacts */}
      <div className="mt-50 ml-160 text-center absolute">
        <ul className="text-xl">
          {emergencyContacts.length > 0 ? (
            emergencyContacts.map((contact, index) => (
              <li key={index} className="mb-2">
                {editingContact === index ? (
                  <div className="flex items-center space-x-2">
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="border p-2 rounded"
                      placeholder="Name"
                    />
                    <input
                      type="text"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="border p-2 rounded"
                      placeholder="Phone"
                    />
                    <button
                      onClick={handleSave}
                      className="px-3 py-1 bg-green-500 text-white rounded"
                    >
                      Save
                    </button>
                    <button
                      onClick={handleDiscard}
                      className="px-3 py-1 bg-red-500 text-white rounded"
                    >
                      Discard Changes
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2">
                    <button className='text-white bg-red-700 hover:bg-red-800 font-bold rounded-lg px-4 py-2'>
                      <strong>{contact.name}</strong>
                    </button>
                    <button
                      onClick={() => handleEdit(index)}
                      className="px-3 py-1 bg-blue-500 text-white rounded"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(index)}
                      className="px-3 py-1 bg-red-500 text-white rounded"
                    >
                      Delete
                    </button>
                  </div>
                )}
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
