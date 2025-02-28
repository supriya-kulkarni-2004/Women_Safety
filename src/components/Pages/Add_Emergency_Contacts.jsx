import React, { useEffect, useState } from 'react'

const Add_Emergency_Contacts = () => {
   
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

export default Add_Emergency_Contacts
