# WST.HL7InterfaceTesting
Web based tool for creating and sending HL7 messages to Transfusion. Currently supports the following ADT messages:
- A01: Create Admission
- A04: Create Registration
- A08: Update Record

Additionally supports the following features of ORM messages:
- Multiple orders
- Note Segments 

# Installing Locally

The following are prequsites for running or developing this tool locally.
- npm
- python 

To start the API:
1. Navigate to the directory /services/api
2. If this is the first time running, run the command 'pip install --no-cache-dir --upgrade -r requirements.txt'
3. Start the the process using 'uvicorn main:app --reload'
4. To view the swagger docs for the api calls go to http://localhost:8000/docs

To start the UI:
1. Navigate to the directory /services/ui
2. If this is the first time running, install the required dependencies using the command 'npm i'
3. In App.js, make sure all of the fetch() calls are using http://localhost:8000/. See the comments in that file for more details
4. Start the process using 'npm start serve'