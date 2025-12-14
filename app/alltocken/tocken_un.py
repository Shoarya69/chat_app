import jwt
from fastapi import HTTPException, Header
from datetime import datetime

SEC = "mysecreate"
ALG = "HS256"

def verfy_tok(token : str):
    try:
        playload = jwt.decode(token,SEC,algorithms=[ALG])
        return playload
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token expired")
        return None
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=401, detail="Invalid token")
        return None