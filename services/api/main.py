from fastapi import FastAPI
from hl7apy.core import Message
from fastapi.middleware.cors import CORSMiddleware
from hl7apy.parser import parse_message
from datetime import datetime
from models.create_message_model import CreateMessageModel

app = FastAPI()

origins = [
    "http://localhost:3000",
    "localhost:3000"
]


app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

def format_datetime(datetime:datetime):
    return datetime.strftime("%Y%m%d%H%M")

@app.get("/routes/message")
async def get_message():
    m = Message("ADT_A01", version="2.5")
    m.msh.msh_3 = 'GHH_ADT'
    m.msh.msh_7 = '20080115153000'
    m.msh.msh_9 = 'ADT^A01^ADT_A01'
    m.msh.msh_10 = "0123456789"
    m.msh.msh_11 = "P"
    m.msh.msh_16 = "AL"
    m.evn.evn_2 = m.msh.msh_7
    m.evn.evn_4 = "AAA"
    m.evn.evn_5 = m.evn.evn_4
    m.evn.evn_6 = '20080114003000'
    m.pid = "PID|1||566-554-3423^^^GHH^MR||EVERYMAN^ADAM^A|||M|||2222 HOME STREET^^ANN ARBOR^MI^^USA||555-555-2004~444-333-222|||M"
    m.nk1.nk1_1 = '1'
    m.nk1.nk1_2 = 'NUCLEAR^NELDA^W'
    m.nk1.nk1_3 = 'SPO'
    m.nk1.nk1_4 = '2222 HOME STREET^^ANN ARBOR^MI^^USA'
    return {"message" : m.to_er7()}

@app.get("/")
async def root():
    return {"message": "Hello World"}

@app.post("/routes/createmessage")
async def create_message(message:CreateMessageModel):
    msh = f'MSH|^~\&|LIS|LKO|HCLL|{message.receiving_facility}|{format_datetime(datetime=datetime.now())}|111|ADT^{message.message_type}|2033.703207|P|2.3|'
    evn = f'EVN|{message.message_type}|{format_datetime(datetime=datetime.now())}|'
    pid = f'PID|||{message.mrn}||{message.patient_last_name}^{message.patient_first_name}||{message.patient_dob.strftime("%Y%m%d")}|{message.patient_sex}||{message.patient_race}|783 Pasquinelli Drive^^Westmont^IL^60301||215-775-7575|630-734-7897||||001|||||'
    pv1= f'PV1||1|1FL^110^A|E||||||ED|||||||||001|SELF||||||||||||||||||||||||{format_datetime(datetime=datetime.now())}|'
    s = msh + evn + pid + pv1
    m = parse_message(s)
    return {"message": m.to_er7()}
