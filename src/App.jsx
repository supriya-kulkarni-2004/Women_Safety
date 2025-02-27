import "./App.css";
import buttonStyles from "./components/buttons/ButtonStyles";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import EditContacts from "./components/pages/edit-contacts/EditContacts";
import AddContact from "./components/pages/add-contact/AddContact.jsx"

function Home() {
  const navigate = useNavigate(); // 🔹 FIX: Define navigate inside the component

  return (
    <>
      <div className="absolute top-0 left-0 p-4">
        <button
          onClick={() => navigate("/EditContacts")} // 🔹 FIX: Correct navigation
          className={buttonStyles.editEmergencyContacts}
        >
          Edit Emergency Contacts
        </button>
      </div>

      <div className="flex items-center justify-center h-screen">
        <button onClick={() => {}} className={buttonStyles.emergencyButton}>
          EMERGENCY
        </button>
      </div>

      <div className="absolute bottom-0 left-0 w-full flex items-center justify-center gap-4 p-6">
        <button onClick={() => {}} className={buttonStyles.editEmergencyContacts}>
          Report Unsafe Location
        </button>

        <button onClick={() => {}} className={buttonStyles.editEmergencyContacts}>
          Find Unsafe Location Near Me
        </button>
      </div>
    </>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} /> {/* Main Page */}
        <Route path="/EditContacts" element={<EditContacts />} /> {/* Edit Contacts Page */}
        <Route path="/AddContact" element={<AddContact />} />
      </Routes>
    </Router>
  );
}

export default App;
