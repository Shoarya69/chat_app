import jwt
from datetime import datetime, timedelta
from app.allSecret import jwt_tocken
SEC = jwt_tocken.SEC
ALG = jwt_tocken.ALG


def create_tocken(user,id):
    expire = datetime.utcnow() + timedelta(hours=1)
    payload = {"sub": user, 
               "id" : id,
               "exp": expire}
    token = jwt.encode(payload, SEC, algorithm=ALG)
    return token