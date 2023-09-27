import socket as s

class InterfaceConnection:
    def __init__(self, address:str, port:int) -> None:
        self.server_address = address
        self.server_port = port

    async def send_data(self, data:any):
        try:
            connection = s.socket(s.AF_INET, s.SOCK_STREAM)
            connection.connect((self.server_address,self.server_port))
            print(connection)
            connection.send(data.encode())
            resp = connection.recv(1024)
            print(resp)
            connection.close()
            return resp.decode()
        except Exception as e:
            return e

