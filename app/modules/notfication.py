from fastapi import APIRouter
from app.alltocken.tocken_un import verfy_tok
from app.mogodatabase import mongo
from app.modles import notfi_del

from app.pop_notfication.pop_notfi import pop_notification

notfi = APIRouter()

@notfi.get("/api/notfi/{tok}")
async def notfi_page(tok: str):
    play_load = verfy_tok(tok)
    if play_load is None:
        return {"error": "Invalid Token"}
    user_id = play_load['id']
    doc = await mongo.user_n.find_one({"user_id": str(user_id)})
    print(user_id)
    if not doc:
        return {"No_Notfi": []}
    print(doc)
    return {
            "Notfi": doc["friend_requests"] 
                        }


@notfi.post("/api/notfi_pop")
async def notf_poped(pop: notfi_del):
    if not pop.tok:
        return {"error": "you do not have token"}
    try:
        playload = verfy_tok(pop.tok)
    except Exception as e:
        print(e)
        return{"error": "Somting went wrong in tocken verfication"}
    if playload is None:
        return {"error": "Invalid Tocken"}
    user_id = playload['id']
    res = await pop_notification(user_id,pop.friend_id,pop.friend_username,pop.Accept)
    if res['success']:
        return {"success": True}
    else:
        return res