from datetime import date,datetime
from app.mogodatabase import mongo


async def mongoSave(id: int,username:str, Name: str, dob:date, email: str, bio: str, country: str):
    user_d = {
        "id": id,
        "Name": Name,
        "Username": username,
        "dob": datetime.combine(dob, datetime.min.time()),
        "Email": email,
        "Bio": bio,
        "Country": country,
        "Created_at": datetime.now()
    }
    user_dic = user_d
    try:
        await mongo.user_u.insert_one(user_dic)
        print("User data saverd in mongo db")
        return True
    except Exception as e:
        print("Somting is not right in Mongodb")
        return False


