from pydantic import BaseModel

class UserCreate(BaseModel):
    tenantid: str
    username: str
    email: str
    password: str

class Requestdetails(BaseModel):
    tenantid: str
    username:str
    password:str
        
class Changepassword(BaseModel):
    tenantid: str
    email:str
    old_password:str
    new_password:str