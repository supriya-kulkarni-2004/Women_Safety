import "./App.css";
import buttonStyles from "./Components/buttons/ButtonStyles";
import Edit_Page from "./components/Pages/Edit_Page";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate(); // 🔹 FIX: Define navigate inside the component

  return (
    <>
      <div className="absolute top-0 left-0 p-4">
        <button
          onClick={() => {
            navigate("/EditContacts");
          }}
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
        <button
          onClick={() => {}}
          className={buttonStyles.editEmergencyContacts}
        >
          Report Unsafe Location
        </button>

        <button
          onClick={() => {}}
          className={buttonStyles.editEmergencyContacts}
        >
          Find Unsafe Location Near Me
        </button>
      </div>
    </>
  );
}

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} /> {/* Main Page */}
          <Route path="/EditContacts" element={<Edit_Page />} />{" "}
          {/* Edit Contacts Page */}
        </Routes>
      </Router>
    </>
  );
}

export default App;
