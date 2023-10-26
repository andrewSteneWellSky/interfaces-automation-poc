from pydantic import BaseModel
from typing import List
from models.create_message_model import CreateMessageModel

class Order(BaseModel):
    number: int
    order_type: str
    order_code: str
class NoteSegement(BaseModel):
    note: str 

class Orm(CreateMessageModel):
    specimen: str
    has_notes: bool = False
    notes: List[NoteSegement] | None = None
    orders: List[Order]
    