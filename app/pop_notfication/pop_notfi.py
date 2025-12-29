from app.mogodatabase import mongo
from app.pop_notfication.add_friend_mongo import add_friends_abc

async def pop_notification(user_id, friend_id, friend_username ,Accepet):
    if Accepet:
        res = await add_friends_abc(user_id,friend_id,friend_username)
        if res.get("error"):
            return {"error": "Somting went wrong with database"}
        try:
            user_id = str(user_id)
            friend_id = int(friend_id)
            res = await mongo.user_n.update_one(
                {"user_id": user_id},
                {
                    "$pull":{
                        "friend_requests": {"id": friend_id}
                    }
                }
            )
            return {"success": True}
        except Exception as e:
            print(e)
            return {"error": "Somting Went wrong with database"}
        
    else:
        pass