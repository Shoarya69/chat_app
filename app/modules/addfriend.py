from fastapi import APIRouter
from app.modles import addFriend_op
from app.alltocken.tocken_un import verfy_tok
from app.mogodatabase import mongo
from app.websocket.manager_12 import manager
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
        return {}
    isAlready_f = await mongo.user_f.find_one({
        "user_id": user_id,
        "friends": add_friend.friend_id
    })
    if isAlready_f:
        return {"already_fri": True}    

    await mongo.user_f.update_one(
        {"user_id": user_id},
        {
            "$addToSet": {  # Duplicate IDs prevent karega
                "friends": add_friend.friend_id,
                "frined_username": add_friend.friend_username
            }
        },
        upsert=True  # Document nahi hoga to create karega automatically
    )

    # delivered = await manager.friend_notfi(to_user_id=add_friend.friend_id,from_user_id=user_id)
    delivered = await add_notfication(add_friend.friend_id,user_id,user_name)
    return {"Added" : True,
            "delevered": delivered
            }

async def add_notfication(to_user_id: str,from_user_id: str,user_name:str):
    try: 
        await mongo.user_n.update_one(
                    {"user_id" : to_user_id},
                    {"$push" : {
                                "frined_request": user_name,
                                "friend_request_id": from_user_id
                                }
                    },
                    upsert=True
                )
        return True
    except:
        return False
    