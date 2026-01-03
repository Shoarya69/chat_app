from motor.motor_asyncio import AsyncIOMotorClient
from pydantic import BaseModel
from app.allSecret import mongo_sec
class User(BaseModel):
    name: str
    age: int


class MongoConnect:
    def __init__(self):
        uri = mongo_sec.mongo_url
        self.client = AsyncIOMotorClient(uri)
        self.db = self.client["chat_app"]

        # Collections
        self.user_f = self.db["friends"]
        self.user_c = self.db["chats"]
        self.user_n = self.db['notfication']
        self.user_u = self.db["user_data"]
mongo = MongoConnect()