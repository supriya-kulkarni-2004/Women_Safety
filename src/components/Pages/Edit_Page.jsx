import React, {  useState } from 'react'

const Edit_Page = () => {

  const [emergencyContacts,setEmergencyContacts] = useState([]);

  const [name,setName] = useState("")
  const [phone,setPhone] = useState("")

  function addName(event) {
    setName(event.target.value)
  }

  function addPhone(event) {
    setPhone(event.target.value)
  }

  function addContacts() {
    const temp = {
      'name':name,
      'phone':phone
    }
    
    setEmergencyContacts([...emergencyContacts, temp]);
    // setEmergencyContacts(emergencyContacts.push(temp))
    console.log(emergencyContacts)
    // setName('')
    // setPhone('')
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
        <div className=' absolute flex items-center justify-center gap-4 p-6 mt-80 ml-130'>
          <input placeholder='Name'  type='text' className='border-1 pt-3 pb-3 pl-6 pl-6' onChange={addName}/>
          <input placeholder='Mobile Phone'  type='text'  className='border-1 pt-3 pb-3 pl-6 pl-6'  onChange={addPhone}/>
        </div>
        <div className='absolute flex items-center justify-center gap-6 p-6 mt-100 ml-200  '>
          <button className='border-1 border-black-500 bg-black text-white p-3' onClick={addContacts}>
            Save
          </button>
          <button className='border-1 border-black-500 bg-black text-white p-3'>Delete</button>
        </div>
      </div>

    </div>


  )
}

export default Edit_Page
