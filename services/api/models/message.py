from pydantic import BaseModel

class Message(BaseModel):
    message_type: str
    message: str