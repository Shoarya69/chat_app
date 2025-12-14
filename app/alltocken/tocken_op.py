import jwt
from datetime import datetime, timedelta
SEC = "mysecreate"
ALG = "HS256"

def create_tocken(user,id):
    expire = datetime.utcnow() + timedelta(hours=1)
    payload = {"sub": user, 
               "id" : id,
               "exp": expire}
    token = jwt.encode(payload, SEC, algorithm=ALG)
    return token