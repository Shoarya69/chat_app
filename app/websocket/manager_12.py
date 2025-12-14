from typing import Dict, List
from fastapi import WebSocket
import asyncio
import json
from datetime import datetime
current_time = datetime.now().isoformat(timespec="seconds")
class ConnectionManager:
    def __init__(self):
        self.connected_user: dict[str,list[WebSocket]] = {}

    async def connect(self,websocket: WebSocket,user_id :str):
        print("We are trying to connect with the user:- ",user_id)
        await websocket.accept()
        if user_id not in self.connected_user:
            self.connected_user[user_id] =[]
        self.connected_user[user_id].append(websocket)
        print("User is connected :- ",user_id)
    
    async def disconnect(self,websocket: WebSocket,user_id: str):
        print("user is going to dissconnect ")
        if user_id not in self.connected_user:
            print("user is not in connection already")
            return
        try:
            self.connected_user[user_id].remove(websocket)
        except Exception as e:
            print("webSockect is not found")

        # If no sockets left, remove user
        if len(self.connected_user[user_id]) == 0:
            self.connected_user.pop(user_id)

        # await websocket.close()
        print("Disconnected:", user_id)            

    async def send_message(self, from_user: str, to_user: str, message: str):
        if to_user in self.connected_user:
            for ws in self.connected_user[to_user]:
                await ws.send_json({"from": from_user,"msg": message, "created_at": current_time})
                print("send success")
        else:
            print(f"User {to_user} not connected")

manager = ConnectionManager()
