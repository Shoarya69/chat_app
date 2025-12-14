from fastapi import APIRouter
from app.mogodatabase import mongo
from app.alltocken.tocken_un import verfy_tok
from app.modles import isFriend_op
from app.alltocken.tocken_un import verfy_tok
friend = APIRouter()

# @friend.get("/api/friends/")
# def dash_page():
#     return [{"Message": "This is an dash page"}]

@friend.get("/api/friends/{tok}")
async def see_friend(tok: str):
    playload = verfy_tok(tok)
    if playload:
        user_id = playload["id"]
        doc = await mongo.user_f.find_one({"user_id" : user_id})
        print(doc)
        if not doc:
            return {"friends":[]}
        
        return {
            "friends": { 
                "username": doc["frined_username"],
                "user_id": doc['friends']
                } 
            }

@friend.post("/api/isfriend")
async def is_friend(fir : isFriend_op):
    playload = verfy_tok(fir.tok)
    if playload is None:
        print("User is not in Session")
        return {"Error" : True}
    if fir.friend_id is None:
        return {"is_friend": False}
    is_friwend = await mongo.user_f.find_one({
        "user_id" : playload['id'],
        "friends": {"$in": [fir.friend_id]}
    })
    return {"is_friend" : bool(is_friwend)}