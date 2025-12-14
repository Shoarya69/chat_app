from fastapi import APIRouter
from app.alltocken.tocken_un import verfy_tok
from app.mogodatabase import mongo
notfi = APIRouter()

@notfi.get("/api/notfi/{tok}")
async def notfi_page(tok: str):
    play_load = verfy_tok(tok)
    if play_load is None:
        return {"error": "Invalid Token"}
    user_id = play_load['id']
    doc = await mongo.user_n.find_one({"user_id": str(user_id)})
    print(user_id)
    if not doc or "frined_request" not in doc:
        return {"notifications": []}
    
    return {
            "Notfi": { 
                "user_name": doc["frined_request"],
                "user_id": doc['friend_request_id']
                } 
            }