import React, { useState, useRef} from "react";
import './App.css'
import { Popover, PrimaryButton, SecondaryButton, TextInput, Select, Header, TertiaryButton, TextArea} from '@mediwareinc/wellsky-dls-react'
import { Box, Checkbox } from "@chakra-ui/react";

function App() {
  //message that is generated and eventually sent to the API
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const [facility, setFacility] = useState('');
  const [mrn, setMrn] = useState('');
  const [patientLastName, setLastName] = useState('');
  const [patientFirstName, setFirstName] = useState('');
  const [patientMiddleName, setMiddleName] = useState('')
  const [patientSex, setSex] = useState('');
  const [result, setResult] = useState('');
  //Order info
  const [orderType, setOrderType] = useState('');
  const [orderCode, setOrderCode] = useState('');
  const [specimen, setSpecimen] = useState('');
  //Full list of orders
  const [orders, setOrders] = useState([])
  const ordersCount = useRef(0)
  //Controls the notes visability of the notes region
  const [addNotes, setAddNotes] = useState(false)
  //Contains the notes that are sent to the backend API 
  const [notes, setNotes] = useState([])
  //Contains the text within the notes textarea before parsing
  const [notesText, setNotesText] = useState("")

  //Determines if the Generated message is able to be edited
  const [isEditable, setEditable] = useState(false);

  //For determining what server the messages are being sent to
  const [serverAddress, setServerAddress] = useState("10.16.0.8")
  const [serverPort, setServerPort] = useState(21003)

  const createAdtMessageApi = async () => {
    try{
      const response = await fetch('http://localhost:8000/api/v1/createmessage/adt', 
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
          patient_middle_name: patientMiddleName,
          patient_dob: new Date(), 
          patient_sex: patientSex, 
          patient_race: 'A', 
          patient_address: '783 Pasquinelli Drive^^Westmont^IL^60301',
          patient_phone: '913-785-1111',
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
    const response = await fetch('http://localhost:8000/api/v1/createmessage/orm', 
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
        patient_middle_name: patientMiddleName,
        patient_dob: new Date(), 
        patient_sex: patientSex, 
        patient_race: 'A', 
        patient_address: '783 Pasquinelli Drive^^Westmont^IL^60301',
        patient_phone: '913-785-1111',
        has_notes: addNotes,
        notes: notes,
        specimen: specimen,
        orders:orders,
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

const sendMessageApi = async () =>  {
  try{
    const response = await fetch('http://localhost:8000/api/v1/sendmessage/', 
    { method: "POST", 
      headers:{
        'accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(
        {message_type: messageType,
        message: message,
        server_address: serverAddress,
        server_port: serverPort
       })
  });

  if (!response.ok)
    throw new Error(response.status)
  const data = await response.json()
  setResult(data.response)
  
} catch (error)
{
  console.error('Error',error)
}
}

function clear()
{
  setMessage('')
  setEditable(false)
}

function save()
{
  setEditable(false)
  console.log("state: " + message)
}

function updateMessage(value)
{
  setMessage(value)
}

function parseAndStoreNotes()
{
  var tempNotes = notesText.split("\n")
  var temp = []
  for(var i = 0; i < tempNotes.length; i++)
  {
    if(tempNotes[i]===null)
      tempNotes[i] = ""
    if(tempNotes[i]!=="")
      temp[i] = {note:tempNotes[i]}
  }
  setNotes(temp)
}

function addNotesVisable(value)
{
  setAddNotes(value)
  if (!value)
  {
    setNotes([])
  }
}

function parseAndStoreOrders()
{
  let tempArr = [...orders]
  ordersCount.current ++
  tempArr.push({number:ordersCount.current, order_type:orderType, order_code:orderCode})
  setOrders(tempArr)
}

function removeOrder()
{
  ordersCount.current --
  let tempArr = [...orders]
  tempArr.pop()
  setOrders(tempArr)
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
          <option value="A08">
            A08 - Update 
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
        <TextInput label="Patient Middle Name" inputProps={{defaultValue: '', onChange: e => setMiddleName(e.target.value), placeholder: '' }}/>
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
          <>
            <>
              <h1><b>Order details:</b></h1>
              <br/>
              <>
                {orders.map(order => (<li key={order.number}>Order #{order.number}: {order.order_type},{order.order_code}</li>))}
              </>
              <br/>
              <TextInput label="Specimen Number" inputProps={{defaultValue: '', onChange: e => setSpecimen(e.target.value), placeholder: '' }}/>
              <br/>
              <Select
              placeholder = "Select Order Type"
              onChange={(e)=>setOrderType(e.target.value)}
              >
                <option value="G">
                  Group 
                </option>
                <option value="T">
                  Test 
                </option>
                <option value="P">
                  Product 
                </option>
              </Select>
              <br/>
              <TextInput label="Order Code" inputProps={{defaultValue: '', onChange: e => setOrderCode(e.target.value), placeholder: '' }}/>
              <br/>
              <Checkbox isChecked = {addNotes} onChange={(e)=>addNotesVisable(e.target.checked)}>Notes?</Checkbox>
              <br/>
              <PrimaryButton isDisabled={orderCode === "" || orderType === ""} onClick={()=>parseAndStoreOrders()}>Add Order</PrimaryButton><SecondaryButton isDisabled={!ordersCount.current > 0} onClick={()=>removeOrder()}>Remove Order</SecondaryButton>
              <br/>
              <br/>
              {addNotes? <Box>
                <TextArea
                  helpText="Enter one note per line"
                  placeholder="Enter Text"
                  onChange={(e)=>setNotesText(e.target.value)}
                />
          <br/>
          <SecondaryButton onClick={()=>parseAndStoreNotes()}>Add Note</SecondaryButton>
          <br/>
          <br/>
          </Box>:<></>}
            </>
            <PrimaryButton isDisabled = {isEditable} onClick={()=>createOrmMessageApi()}>Get ORM Message</PrimaryButton>
          </>:
          <> 
            <PrimaryButton isDisabled = {isEditable} onClick={()=>createAdtMessageApi()}>Get ADT Message</PrimaryButton>
          </>}
        </Box>

        <br/>
        {message === ""? <></>:<Box w = "75%" className="Text">
          <TextArea isDisabled = {!isEditable} height={"250px"} onChange={(e)=> updateMessage(e.target.value)} value={message}/>
        </Box>}
        <br/>
       { message ===""?<></>:<><li>Server:<Box w= "15%" className="App"><TextInput isDisabled={!isEditable} inputProps={{defaultValue: serverAddress, onChange: e => setServerAddress(e.target.value), placeholder: '' }}/></Box>
</li><li>Port:<Box w= "15%" className="App"><TextInput isDisabled = {!isEditable} inputProps={{defaultValue: serverPort, onChange: e => setServerPort(e.target.value), placeholder: '' }}/></Box></li><br/><Popover content = {result} title = "Message Sent"><PrimaryButton isDisabled = {isEditable} onClick = {() => sendMessageApi()}>
          Send Message
        </PrimaryButton></Popover>{isEditable ? <SecondaryButton onClick={()=> save()}>Save</SecondaryButton>:<SecondaryButton onClick={()=> setEditable(true)}>Edit</SecondaryButton>}<TertiaryButton onClick={()=>clear()}>Clear</TertiaryButton></>}
    </Box>
    </div>
  );
}
export default App;