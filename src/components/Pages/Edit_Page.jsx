import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Edit_Page() {
  const navigate = useNavigate();
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
    const { name, value } = e.target;
    if (name === "phone" && !/^\d{0,10}$/.test(value)) return; // Allow only numbers and max 10 digits
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = () => {
    if (!formData.name.trim() || !formData.phone.trim()) {
      alert("Please fill out all fields before saving.");
      return;
    }

    if (formData.phone.length !== 10) {
      alert("Phone number must be exactly 10 digits.");
      return;
    }

    if (emergencyContacts.some((contact, index) => index !== editingContact && contact.phone === formData.phone)) {
      alert("This phone number is already in the contact list.");
      return;
    }

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
    alert("Contact Saved Successfully");
  };

  const handleDiscard = () => {
    if (formData.name || formData.phone) {
      if (!confirm("You have unsaved changes. Do you really want to discard?")) {
        return;
      }
    }
    setEditingContact(null);
    setAddingContact(false);
    setFormData({ name: "", phone: "" });
  };

  const handleDelete = (index) => {
    if (confirm("Are you sure you want to delete this contact?")) {
      const updatedContacts = emergencyContacts.filter((_, i) => i !== index);
      setEmergencyContacts(updatedContacts);
      localStorage.setItem("contacts", JSON.stringify(updatedContacts));
    }
  };

  return (
    <div className="p-4 md:p-8">
      {/* Header Section */}
      <div className="flex justify-between items-center w-full gap-2 md:gap-4">
        <p
          className="font-bold text-lg cursor-pointer whitespace-nowrap"
          onClick={() => navigate(-1)}
        >
          Back
        </p>

        <p className="font-bold text-lg text-center flex-1 min-w-0 break-words leading-tight">
          Edit Emergency Contacts
        </p>

        <button
          onClick={() => setAddingContact(!addingContact)}
          className="text-white bg-red-700 hover:bg-red-800 font-bold rounded-lg text-lg px-4 py-2 md:px-6 md:py-3 whitespace-nowrap"
        >
          {addingContact ? "CLOSE" : "Add Contact"}
        </button>
      </div>




      {/* Add Contact Form */}
      {addingContact && (
        <div className="w-full max-w-md mx-auto bg-gray-100 p-4 rounded-lg shadow-lg">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="border p-2 w-full rounded mb-2"
            placeholder="Name"
          />
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="border p-2 w-full rounded mb-2"
            placeholder="Phone"
          />
          <div className="flex justify-between">
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

      {/* Contact List - Responsive Stacked Layout */}
      <div className="mt-6 flex flex-col items-center space-y-4 w-full">
        {emergencyContacts.length > 0 ? (
          emergencyContacts.map((contact, index) => (
            <div
              key={index}
              className="w-full max-w-md bg-white shadow-lg rounded-lg p-4 text-center"
            >
              {editingContact === index ? (
                <div>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="border p-2 w-full rounded mb-2"
                    placeholder="Name"
                  />
                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="border p-2 w-full rounded mb-2"
                    placeholder="Phone"
                  />
                  <div className="flex justify-between">
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
              ) : (
                <div>
                  <h3 className="text-xl font-bold">{contact.name}</h3>
                  <p className="text-gray-600">{contact.phone}</p>
                  <div className="flex justify-between mt-2">
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
                </div>
              )}
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-lg">No contacts saved yet.</p>
        )}
      </div>
    </div>
  );
}

export default Edit_Page;
