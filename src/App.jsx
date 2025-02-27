import "./App.css";
import buttonStyles from "./components/buttons/ButtonStyles";

function App() {
  return (
    <>
      <div className="absolute top-0 left-0 p-4">
        <button
          onClick={() => {}}
          className={buttonStyles.editEmergencyContacts}
        >
          Edit Emergency Contacts
        </button>
      </div>

      <div className="flex items-center justify-center h-screen">
        <button
          onClick={() => {}}
          className={buttonStyles.emergencyButton}
        >
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

export default App;
