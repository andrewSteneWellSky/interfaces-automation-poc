from pydantic import BaseModel
from datetime import datetime

class CreateMessageModel(BaseModel):
    message_type: str
    receiving_facility: str
    mrn: str
    patient_last_name: str
    patient_first_name: str
    patient_dob: datetime | None = None
    patient_sex: str
    patient_race: str
    patient_address: str
    patient_phone: str


