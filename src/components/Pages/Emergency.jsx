import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Emergency = () => {
  const navigate = useNavigate();
  const [emergencyContacts, setEmergencyContacts] = useState([]);
  const [location, setLocation] = useState("");
  const [locationFetched, setLocationFetched] = useState(false);

  useEffect(() => {
    const storedContacts = JSON.parse(localStorage.getItem("contacts")) || [];
    setEmergencyContacts(storedContacts);
  }, []);

  function call(phone) {
    window.location.href = "tel:" + phone;
  }

  function sendSMS(phone) {
    if (!locationFetched) {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            const googleMapsUrl = `http://maps.google.com/maps?q=${lat},${lon}`;
            setLocation(googleMapsUrl);
            setLocationFetched(true);

            // After setting location, send the message
            sendMessage(phone, googleMapsUrl);
          },
          (error) => {
            console.error("Error getting location:", error);
            alert("Unable to fetch location. Please enable GPS.");
          }
        );
      } else {
        alert("Geolocation is not supported by your browser.");
      }
    } else {
      sendMessage(phone, location);
    }
  }

  function sendMessage(phone, locationUrl) {
    let message = "I am in emergency. I need help.";
    if (locationUrl) {
      message += ` My location: ${locationUrl}`;
    }
    window.location.href = `sms:${phone}?body=${encodeURIComponent(message)}`;
  }

  return (
    <div>
      <div className="mt-10 flex flex-col space-y-4 w-full px-4">
        <p className="font-bold text-lg cursor-pointer" onClick={() => navigate(-1)}>
          Back
        </p>
      </div>
      <div className="mt-10 flex flex-col items-center space-y-4 w-full px-4">
        {emergencyContacts.length > 0 ? (
          emergencyContacts.map((contact, index) => (
            <div key={index} className="bg-white shadow-lg rounded-lg p-4 w-full max-w-sm flex justify-between items-center">
              <div>
                <h3 className="text-xl font-bold">{contact.name}</h3>
                <p className="text-gray-600">{contact.phone}</p>
              </div>
              <button className="px-4 py-2 bg-green-500 text-white rounded" onClick={() => call(contact.phone)}>
                Call
              </button>
              <button className="px-4 py-2 bg-green-500 text-white rounded" onClick={() => sendSMS(contact.phone)}>
                Send SMS
              </button>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-lg">No contacts saved yet.</p>
        )}
      </div>
    </div>
  );
};

export default Emergency;
