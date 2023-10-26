from fastapi import APIRouter, Response,status
from hl7apy.parser import parse_message
from helpers.interface_connection_helper import InterfaceConnection
from models.message import Message

router = APIRouter(prefix="/api/v1")

@router.post("/sendmessage/", tags=["send"])
async def send_message(message:Message):
    i = InterfaceConnection(message.server_address,message.server_port)
    m = parse_message(validate_message(message))

    r = await i.send_data(m.to_mllp())
    return {"response": r}

def validate_message(message:Message):
    s = message.message.replace("\n","\r")
    return s