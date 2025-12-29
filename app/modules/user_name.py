from fastapi import APIRouter
from app.sqldatabase import get_cursor
from app.modles import Checkusername
user_name_c = APIRouter()

@user_name_c.post("/api/check_username")
def user(username: Checkusername):
    cursor = None
    conn = None
    try:
        if not username.username:
            return {"error": "please enter user name"}
        
        cursor,conn = get_cursor()
        query = "SELECT username from FOC.user_chat WHERE username = %s"
        value = (username.username,)
        cursor.execute(query,value)
        result = cursor.fetchall()
        if result:
            return {"exists": True}
        return {"success": "you can you this Username"}
    except Exception as e:
        print(e)
        return {"error": "Server side errorr"}
    finally:
        if cursor:
            cursor.close()
        if conn:
            conn.close()




