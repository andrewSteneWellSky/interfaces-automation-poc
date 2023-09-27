from fastapi import APIRouter
from hl7apy.parser import parse_message
from helpers.interface_connection_helper import InterfaceConnection
from models.message import Message

router = APIRouter(prefix="/routes")

@router.post("/sendmessage/", tags=["send"])
async def send_message(message:Message):
    i = InterfaceConnection("10.16.0.8",21003)
    m = parse_message(message.message)
    r = await i.send_data(m.to_mllp())
    print(r)
    return {"response": r}