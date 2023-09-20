import React, { useState} from "react";



function App() {
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const [facility, setFacility] = useState('');
  const [mrn, setMrn] = useState('');
  const [patientLastName, setLastName] = useState('');
  const [patientFirstName, setFirstName] = useState('');
  const [patientSex, setSex] = useState('');
  const [result, setResult] = useState('');
  const [orderType, setOrderType] = useState('');
  const [orderCode, setOrderCode] = useState('');

  const createAdtMessageApi = async () => {
    try{
      const response = await fetch('http://localhost:8000/routes/createmessage/adt', 
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
          patient_sex: patientSex, 
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

const createOrmMessageApi = async () => {
  try{
    const response = await fetch('http://localhost:8000/routes/createmessage/orm', 
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
        patient_sex: patientSex, 
        patient_race: 'A', 
        patient_address: '783 Pasquinelli Drive^^Westmont^IL^60301',
        patient_phone: '913-785-1111',
        order_type: orderType,
        order_code: orderCode,
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

const sendMessageApi = async () => {
  try{
    const response = await fetch('http://localhost:8000/routes/sendmessage', 
    { method: "POST", 
      headers:{
        'accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(
        {message_type: messageType,
        message: message
       })
  });

  if (!response.ok)
    throw new Error(response.status)
  const data = await response.json()
  setResult(data.response)
  window.confirm(result)
  
 
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
            <option value="A01">A01 - Admission</option>
            <option value="A04">A04 - Registration</option>
            <option value="ORM">ORM - Order</option>
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
    <p>Patient Gender:
        <select id="select1" onChange={event=>setSex(event.target.value)}>
           <option value=" "> </option>
            <option value="M">M</option>
            <option value="F">F</option>
        </select>
      </p>
      
    {messageType === "ORM" ? <div><p>Order Type:
          <input onInput={event=>setOrderType(event.target.value)}></input>
      </p>
      <p>Order Code:
          <input onInput={event=>setOrderCode(event.target.value)}></input>
      </p>
      <br/>
      <button onClick={()=>createOrmMessageApi()}>Get ORM Message</button>
      </div>:<div> <button onClick={()=>createAdtMessageApi()}>Get ADT Message</button></div>}
      <button onClick={()=>setMessage('')}>Clear</button>
      <br/>
      {<p>{message}</p>}
      <br/>
      <button onClick={()=>sendMessageApi()}>Send Message</button>
    </div>
  );
}
export default App;