from models.create_message_model import CreateMessageModel
from models.orm import Orm
from datetime import datetime, timedelta
import random, string

class MessageGenerator: 

    def format_datetime(self):
        return datetime.now().strftime("%Y%m%d%H%M")
    
    def generate_adt(self, message:CreateMessageModel) -> str:
        try:
            msh = f'MSH|^~\&|LIS|LKO|HCLL|{message.receiving_facility}|{self.format_datetime()}|111|ADT^{message.message_type}|2033.703207|P|2.3|\r'
            evn = f'EVN|{message.message_type}|{self.format_datetime()}|\r'
            pid = f'PID|||{message.mrn}||{message.patient_last_name}^{message.patient_first_name}^{message.patient_middle_name}||{message.patient_dob.strftime("%Y%m%d")}|{message.patient_sex}||{message.patient_race}|783 Pasquinelli Drive^^Westmont^IL^60301||215-775-7575|630-734-7897||||001|||||\r'
            pv1 = f'PV1||1|1FL^110^A|E||||||ED|||||||||001|SELF||||||||||||||||||||||||{self.format_datetime()}|'
         
            return "".join([msh,evn,pid,pv1])
        except Exception as e:
            return e

        
    def generate_orm(self, orm:Orm) -> str:
        try:
            orders =[]
            msh = f'MSH|^~\&|LIS|LKO|HCLL|{orm.receiving_facility}|{self.format_datetime()}||ORM^O01|5170.2022|P|2.3|\r'
            evn = f'EVN|O01|{self.format_datetime()}|\r'
            pid = f'PID|||{orm.mrn}||{orm.patient_last_name}^{orm.patient_first_name}||{orm.patient_dob.strftime("%Y%m%d")}|{orm.patient_sex}||{orm.patient_race}|783 Pasquinelli Drive^^Westmont^IL^60301||215-775-7575|630-734-7897||||002|||||\r'
            pv1 = f'PV1||1|1FL^110^A|E||||||ED|||||||||1337|SELF||||||||||||||||||||||||{self.format_datetime()}|\r'
            orc = f'ORC|NW||||||||{self.format_datetime()}|\r'

            s = "".join([msh, evn, pid, pv1,orc])

            for i in orm.orders:
                obr = f'OBR||||{i.order_type}^{i.order_code}^|R|{self.format_datetime()}||||||||||100||||||||\r'
                orders.append(obr)

            o = "".join(orders)
            s+= o
            spm = f'SPM||{orm.specimen}|DR|P||||{orm.receiving_facility}||1FL|||||BBREF1||{self.format_datetime()}|{self.format_datetime()}|{self.format_datetime()}||||||||LAV|DR|' 
            s+= spm
            
            if orm.has_notes:
                notes_temp = []
                s+= "\r"
                for i in range(len(orm.notes)):
                    note = f'NTE|{i+1}||{orm.notes[i].note}\r'
                    notes_temp.append(note)

                nte = "".join(notes_temp)
                pv1 += '\r'
                print(pv1)

                return "".join([s,nte])
            

            return s
        except Exception as e:
            return e

    def generate_random_message(self, message_type:str) -> str:
        try:
            mrn = ''.join(random.choices(string.digits, k=6))
            patient_last_name = ''.join(random.choices(string.ascii_uppercase, k=5))
            patient_first_name = ''.join(random.choices(string.ascii_uppercase, k=5))
            patient_dob = datetime.now() - timedelta(days=random.randint(365*18, 365*80))
            patient_sex = random.choice(['M', 'F'])
            patient_race = random.choice(['W', 'B', 'A', 'H', 'O'])
            
            msh = f'MSH|^~\&|LIS|LKO|HCLL|HMC|{self.format_datetime()}|111|ADT^{message_type}|2033.703207|P|2.3|\r'
            evn = f'EVN|{message_type}|{self.format_datetime()}|\r'
            pid = f'PID|||{mrn}||{patient_last_name}^{patient_first_name}||{patient_dob.strftime("%Y%m%d")}|{patient_sex}||{patient_race}|783 Pasquinelli Drive^^Westmont^IL^60301||215-775-7575|630-734-7897||||002|||||\r'
            pv1 = f'PV1||1|1FL^110^A|E||||||ED|||||||||1337|SELF||||||||||||||||||||||||{self.format_datetime()}|'

            s = (( msh + evn + pid + pv1))

            return s
        except Exception as e:
            return e
        
        
    
    

    

   