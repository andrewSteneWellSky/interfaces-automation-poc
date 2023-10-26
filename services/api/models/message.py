from pydantic import BaseModel

class Message(BaseModel):
    message_type: str
    message: str
    server_address: str = "10.16.0.8"
    server_port: int = 21003