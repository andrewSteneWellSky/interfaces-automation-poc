from fastapi import APIRouter
from hl7apy.core import Message
from helpers.message_generator import MessageGenerator
from models.create_message_model import CreateMessageModel
from models.orm import Orm

router = APIRouter(prefix="/routes")

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