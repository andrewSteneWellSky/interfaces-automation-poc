from pydantic import BaseModel
from models.create_message_model import CreateMessageModel

class Orm(CreateMessageModel):
    order_type: str
    order_code: str
    