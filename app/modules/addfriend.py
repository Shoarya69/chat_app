from fastapi import APIRouter
from app.modles import addFriend_op
from app.alltocken.tocken_un import verfy_tok
from app.mogodatabase import mongo
from app.websocket.manager_12 import manager
from app.pop_notfication.add_friend_mongo import add_friends_abc

add_f = APIRouter()

@add_f.post("/api/addfriend")
async def add_friend(add_friend: addFriend_op):
    playload = verfy_tok(add_friend.tok)
    if playload is None:
        return {"error": "Somting went completly Wrong with your token try again later"}
    user_id = playload['id']
    user_name = playload["sub"]
    if not add_friend.friend_id:
        print("Never resived friend id")
        return {"error": "Somting went wrong we never reciverd friends id"}
    if (user_id == add_friend.friend_id):
        return{"error": "You can not becume friends with self"}
    isAlready_f = await mongo.user_f.find_one({
        "user_id": user_id,
        "friends": add_friend.friend_id
    })
    if isAlready_f:
        return {"already_fri": True}    

    res = await add_friends_abc(user_id,add_friend.friend_id,add_friend.friend_username)
    if res['error']:
        return{"error": "Somting went wrong with database"}
    
    # delivered = await manager.friend_notfi(to_user_id=add_friend.friend_id,from_user_id=user_id)
    delivered = await add_notfication(add_friend.friend_id,user_id,user_name)
    return {"Added" : True,
            "delevered": delivered
            }

async def add_notfication(to_user_id: str,from_user_id: str,user_name:str):
    try: 
        await mongo.user_n.update_one(
            {"user_id": to_user_id},
            {
                "$addToSet": {
                    "friend_requests": {
                        "id": from_user_id,
                        "username": user_name
                    }
                }
            },
            upsert=True
        )
        return True
    except Exception as e:
        print(e)
        return False
    