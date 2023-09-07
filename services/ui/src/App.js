import React, { useState, useEffect } from "react";

function App() {
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const [facility, setFacility] = useState('');
  const [mrn, setMrn] = useState('');
  const [patientLastName, setLastName] = useState('');
  const [patientFirstName, setFirstName] = useState('');

  const hitApi = async () => {
    try{
      const response = await fetch('http://localhost:8000/routes/createmessage', 
      { method: "POST", 
        headers:{
          'accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(
          {message_type: messageType,
          receiving_facility: facility,
          mrn: mrn, 
          patient_last_name: patientLastName, 
          patient_first_name: patientFirstName,
          patient_dob: new Date(), 
          patient_sex: 'F', 
          patient_race: 'A', 
          patient_address: '783 Pasquinelli Drive^^Westmont^IL^60301',
          patient_phone: '913-785-1111'
         })
    });

    if (!response.ok)
      throw new Error(response.status)
    const data = await response.json()
    setMessage(data.message)
   
  } catch (error)
  {
    console.error('Error',error)
  }
}

  return (
    <div className="App-Header">
      <h2>Select Options:</h2>
      <p> ADT Message Type:
        <select id="select1" onChange={event=>setMessageType(event.target.value)}>
           <option value=" "> </option>
            <option value="A01">A01</option>
            <option value="A04">A04</option>
        </select>
    </p>
    <p>Receiving Facility:
      <input onInput={event=>setFacility(event.target.value)}></input>
    </p>
    <p>Patient MRN:
      <input onInput={event=>setMrn(event.target.value)}></input>
    </p>
    <p>Patient Last Name:
      <input onInput={event=>setLastName(event.target.value)}></input>
    </p>
    <p>Patient First Name:
      <input onInput={event=>setFirstName(event.target.value)}></input>
    </p>
    <br/>
      {<p>{message}</p>}
      <button onClick={()=>hitApi()}>Get Message</button><button onClick={()=>setMessage('')}>Clear</button>
    </div>
  );
}
export default App;