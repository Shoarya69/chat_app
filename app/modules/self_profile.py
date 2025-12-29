from fastapi import APIRouter, Depends, Header,HTTPException
from app.alltocken.tocken_un import verfy_tok
from app.mogodatabase import mongo

self_prof = APIRouter()

@self_prof.get("/api/self_profile")
async def get_profile(Authorization: str = Header(None)):
    if not Authorization:
        return {"error" : "Tocken is expire or Missing"}
    try:
        token = Authorization.split(" ")[1]
    except IndexError:
        raise HTTPException(status_code=401, detail="Invalid token")
    playload = verfy_tok(token)
    if not playload:
        print("this user is expier or either have no tocken to asscess this api")
        raise HTTPException(status_code=401, detail="Invalid or Expired tocken")
    user_id = playload['id']
    data = await mongo.user_u.find_one({"id": user_id})
    if not data:
        return {"use_dummy": True}
    data["_id"] = str(data["_id"])
    print(data)
    return data    
