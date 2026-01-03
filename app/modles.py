from pydantic import BaseModel, EmailStr
from datetime import date
class auth_op(BaseModel):
    username : str
    Password : str

class addFriend_op(BaseModel):
    tok: str
    friend_id: str
    friend_username: str
    
class isFriend_op(BaseModel):
    tok: str
    friend_id: str

class chat_op(BaseModel):
    tok: str
    friend_id: str
    text: str
    type: str

class chat_get_op(BaseModel):
    tok: str
    friend_id: str

class regi_op(BaseModel):
    Name: str
    DOB : date
    Email: EmailStr
    Bio: str
    Contry: str
    username: str
    password: str
    e_valadation : bool

class OtpRequsest(BaseModel):
    email: EmailStr

class Otpverify(BaseModel):
    email: EmailStr
    otp : str

class Checkusername(BaseModel):
    username: str

class self_pro(BaseModel):
    tok : str

class notfi_del(BaseModel):
    tok: str
    friend_id: int
    friend_username: str
    Accept: bool