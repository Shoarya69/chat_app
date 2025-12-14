from pydantic import BaseModel

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
    text : str

class chat_get_op(BaseModel):
    tok: str
    friend_id: str