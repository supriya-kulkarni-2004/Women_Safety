import React, {  useEffect, useState } from 'react'

const Edit_Page = () => {

  // const [emergencyContacts,setEmergencyContacts] = useState([]);
  const [emergencyContacts, setEmergencyContacts] = useState(
    JSON.parse(localStorage.getItem('contacts')) || []
  );
  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(emergencyContacts));
    console.log('Updated localStorage:', JSON.parse(localStorage.getItem('contacts')))
  }, [emergencyContacts]);

  const [name,setName] = useState("")
  const [phone,setPhone] = useState("")

  function addContacts() {
    const temp = {
      'name':name,
      'phone':phone
    }
    
    setEmergencyContacts([...emergencyContacts, temp]);
    setName('')
    setPhone('')
    alert('New Contact Added Successfully!')
  }

  function deleteContacts() {
    if(confirm("Are u Sure to delete the Contact")){
      setName('')
      setPhone('')
    }
  }

  return (
    <div>
      
      <div className="absolute w-full flex items-center justify-center gap-4 p-6">
        <button
          onClick={() => {}} className="focus:outline-none text-white bg-red-700 hover:bg-red-800 font-bold rounded-lg text-2xl px-10 py-5 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
        >
          Edit Emergency Contacts
        </button>
      </div>

      <div className="absolute w-full  gap-4 p-6">
        <button
          onClick={() => {addContacts}} className="focus:outline-none text-white bg-red-700 hover:bg-red-800 font-bold rounded-lg text-2xl px-10 py-5 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900 ">
          Add Emergency Contacts
        </button>
      </div>

      <div>
        <div className='absolute flex items-center justify-center gap-4 p-6 mt-80 ml-130'>
          <input placeholder='Name'  type='text' value ={name} className='border-1 pt-3 pb-3 pl-6 pl-6' onChange={(e) => setName(e.target.value)}/>
          <input placeholder='Mobile Phone'  type='tel' value={phone} pattern="[0-9]{10}"  className='border-1 pt-3 pb-3 pl-6 pl-6'  onChange={(e) => setPhone(e.target.value)} />
        </div>
        <div className='absolute flex items-center justify-center gap-6 p-6 mt-100 ml-200  '>
          <button className='border-1 border-black-500 bg-black text-white p-3' onClick={addContacts}>
            Save
          </button>
          <button className='border-1 border-black-500 bg-black text-white p-3' onClick={deleteContacts}>
            Delete
          </button>
        </div>
      </div>

    </div>


  )
}

export default Edit_Page
