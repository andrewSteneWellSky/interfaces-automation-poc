import { useState } from 'react';

async function hitApi(){
    const url = "http://localhost:8000/routes/message"
    const response = await fetch(url, {method: "GET", mode: "no-cors"})
    return response.json()
  }

  export default function BodyPre()
  {
    return(<div>{hitApi().then((data)=>{<pre>{data}</pre>})}</div>)
  }