from fastapi import FastAPI
from hl7apy.core import Message


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
    return {"message" : m}