from hl7apy.core import Message
from hl7apy.parser import parse_message
from models.create_message_model import CreateMessageModel
from models.orm import Orm
from datetime import datetime

class MessageGenerator: 

    def format_datetime(self):
        return datetime.now().strftime("%Y%m%d%H%M")
    
    def generate_adt(self, message:CreateMessageModel) -> str:
        try:
            msh = f'MSH|^~\&|LIS|LKO|HCLL|{message.receiving_facility}|{self.format_datetime()}|111|ADT^{message.message_type}|2033.703207|P|2.3|\r'
            evn = f'EVN|{message.message_type}|{self.format_datetime()}|\r'
            pid = f'PID|||{message.mrn}||{message.patient_last_name}^{message.patient_first_name}||{message.patient_dob.strftime("%Y%m%d")}|{message.patient_sex}||{message.patient_race}|783 Pasquinelli Drive^^Westmont^IL^60301||215-775-7575|630-734-7897||||002|||||\r'
            pv1 = f'PV1||1|1FL^110^A|E||||||ED|||||||||1337|SELF||||||||||||||||||||||||{self.format_datetime()}|'
            s = msh + '\n' +  evn + '\n' +  pid + '\n' +  pv1

            m = parse_message(( msh + evn + pid + pv1))

            return [m.to_er7(), s]
        except Exception as e:
            return e

        
    def generate_orm(self, orm:Orm):
        try:
            msh = f'MSH|^~\&|LIS|LKO|HCLL|{orm.receiving_facility}|{self.format_datetime()}||ORM^O01|5170.2022|P|2.3|\r'
            evn = f'EVN|O01|{self.format_datetime()}|\r'
            pid = f'PID|||{orm.mrn}||{orm.patient_last_name}^{orm.patient_first_name}||{orm.patient_dob.strftime("%Y%m%d")}|{orm.patient_sex}||{orm.patient_race}|783 Pasquinelli Drive^^Westmont^IL^60301||215-775-7575|630-734-7897||||002|||||\r'
            pv1 = f'PV1||1|1FL^110^A|E||||||ED|||||||||1337|SELF||||||||||||||||||||||||{self.format_datetime()}|\r'
            orc = f'ORC|NW||||||||{self.format_datetime()}|\r'
            obr = f'OBR||||{orm.order_type}^{orm.order_code}^|R|{self.format_datetime()}||||||||||100||||||||\r'
            spm = f'SPM||SPC1030a|DR|P||||HOSP||1FL|||||BBREF1||{self.format_datetime()}|{self.format_datetime()}|{self.format_datetime()}||||||||LAV|DR||'

            s = msh + '\n' + evn + '\n' + pid + '\n' +  pv1 + '\n' +  orc + '\n' +  obr + '\n' +  spm
            m = parse_message(msh + evn + pid + pv1 + orc + obr + spm)

            return [m.to_er7(), s]
        except Exception as e:
            return e

    def generate_msh(message_type:str):
        msh = f""
        return msh
    
    def generate_pid():
        pid = f""
        return pid
    

    

   