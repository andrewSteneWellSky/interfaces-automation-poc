import React, { useState} from "react";
import './App.css'
import {ExpandableText, PrimaryButton, SecondaryButton, TextInput, Select, Header} from '@mediwareinc/wellsky-dls-react'
import { Box } from "@chakra-ui/react";



function App() {
  const [message, setMessage] = useState('');
  const [formatedMessage, setFormatedMessage] = useState('');
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
    setFormatedMessage(data.formated_message)
   
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
  setFormatedMessage(data.formated_message)

 
} catch (error)
{
  console.error('Error',error)
}
}

const sendMessageApi = async () =>  {
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

function clear()
{
  setMessage('')
  setFormatedMessage('')
}

  return (
    <div className="App">
      <Box h="250px">
        <Header title="HL7 Interface Message Generator and Sender"/>
      </Box>
      <h1><b>Select Options:</b></h1>
    <Box h= "500 px" w="100%" className="App">      
      <Box w = "500px" className="App">
        <Select
          placeholder = "Select Message Type"
          onChange={(e)=>setMessageType(e.target.value)}
        >
          <option value="A01">
            A01 - Admission 
          </option>
          <option value="A04">
            A04 - Registration 
          </option>
          <option value="ORM">
            ORM - Order 
          </option>
        </Select>
        <br/>            
        <TextInput label="Receiving Facility" inputProps={{defaultValue: '', onChange: e => setFacility(e.target.value), placeholder: '' }}/>
        <br/>
        <TextInput label="Patient MRN" inputProps={{defaultValue: '', onChange: e => setMrn(e.target.value), placeholder: '' }}/>
        <br/>
        <TextInput label="Patient Last Name" inputProps={{defaultValue: '', onChange: e => setLastName(e.target.value), placeholder: '' }}/>
        <br/>
        <TextInput label="Patient First Name" inputProps={{defaultValue: '', onChange: e => setFirstName(e.target.value), placeholder: '' }}/>
        <br/>
        <Select
          placeholder = "Select Patient Gender"
          onChange={(e)=>setSex(e.target.value)}
        >
          <option value="M">
            Male 
          </option>
          <option value="F">
            Female 
          </option>
        </Select>  
      </Box>
      <br/>
        <Box w = "500px" className="App">
         {messageType === "ORM" ? 
          <div>
            <h1><b>Order details:</b></h1>
            <br/>
            <TextInput label="Order Type" inputProps={{defaultValue: '', onChange: e => setOrderType(e.target.value), placeholder: '' }}/>
            <br/>
            <TextInput label="Order Code" inputProps={{defaultValue: '', onChange: e => setOrderCode(e.target.value), placeholder: '' }}/>
            <br/>
            <PrimaryButton onClick={()=>createOrmMessageApi()}>Get ORM Message</PrimaryButton><SecondaryButton onClick={()=>clear()}>Clear</SecondaryButton>
          </div>:
          <div> 
            <PrimaryButton onClick={()=>createAdtMessageApi()}>Get ADT Message</PrimaryButton><SecondaryButton onClick={()=>clear()}>Clear</SecondaryButton>
          </div>}
        </Box>

        <br/>
        {message === ""? <div/>:<Box w = "75%" className="Text">
        <pre >
          {formatedMessage}
        </pre>
        </Box>}
        <br/>
        <PrimaryButton onClick = {() => sendMessageApi()}>
          Send Message
        </PrimaryButton>
    </Box>
      
    </div>
  );
}
export default App;