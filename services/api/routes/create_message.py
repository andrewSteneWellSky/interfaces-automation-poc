from fastapi import APIRouter
from hl7apy.core import Message
from helpers.message_generator import MessageGenerator
from models.create_message_model import CreateMessageModel
from models.orm import Orm

router = APIRouter(prefix="/api/v1")

@router.post("/createmessage/adt",tags=["create"])
async def create_adt_message(c:CreateMessageModel):
    gen = MessageGenerator()
    m = gen.generate_adt(c)

    return {"message" : m}

@router.post("/createmessage/orm",tags=["create"])
async def create_orm_message(o:Orm):
    gen = MessageGenerator()
    m = gen.generate_orm(o)

    return {"message" : m}

@router.get("/generatemessage/{messageType}", tags=["generate"])
async def generate_random_message(messageType: str):
    gen = MessageGenerator()
    if messageType == "A04" or messageType == "A01":
        m = gen.generate_random_message(messageType)
    elif messageType == "ORM":
        m = gen.generate_random_orm()
    else:
        return {"error": "Invalid message type"}

    return {"message": m}