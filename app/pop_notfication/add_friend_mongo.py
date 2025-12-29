from app.mogodatabase import mongo

async def add_friends_abc(user_id,friend_id,friend_username):
    try:
        await mongo.user_f.update_one(
            {"user_id": user_id},
            {
                "$addToSet": {  # Duplicate IDs prevent karega
                    "friends": friend_id,
                    "frined_username": friend_username
                }
            },
            upsert=True  # Document nahi hoga to create karega automatically
        )
        return {"Sucess": True}
    except Exception as e:
        print(e)
        return{"error": True}