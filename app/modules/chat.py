from fastapi import APIRouter
from app.modles import chat_op
from app.alltocken.tocken_un import verfy_tok
from datetime import datetime
from app.sqldatabase import get_cursor,db_pool
chat = APIRouter()

@chat.post("/api/chat_save")
def chat_page(chat_op : chat_op):
    cursor = None
    conn = None
    exist = False
    try:
        playload = verfy_tok(chat_op.tok)
        if not playload:
            print("your is not in session")
            return {"error" : "user is not in session"}
        cursor,conn = get_cursor()

        if conn is None:
            return {"error": "Database connection failed"}
        quary = "INSERT INTO FOC.messages (sender_id,receiver_id,message,created_at) VALUES (%s,%s,%s,%s)"
        value = (playload["id"],chat_op.friend_id,chat_op.text,datetime.now())
        cursor.execute(quary,value)
        exist = True
        return {"Success": True}
    except:
        print("somting went wrong with database")
        return {"error" : True}
    finally:
        if cursor:
            cursor.close()
        if exist:    
            conn.commit()
        if conn:
            conn.close()

@chat.get("/api/chat_get")
def chat_get(tok: str,friend_id: str):
    cursor =None
    conn = None
    try:
        playload = verfy_tok(tok)
        if not playload:
            print("you are not in session")
            return {"error": True}
        cursor,conn = get_cursor()
        user_id = playload["id"]
        quary = """
            SELECT sender_id, receiver_id, message, created_at
            FROM FOC.messages
            WHERE (sender_id = %s AND receiver_id = %s)
               OR (sender_id = %s AND receiver_id = %s)
            ORDER BY created_at ASC
        """
        values = (user_id,friend_id,friend_id,user_id)
        cursor.execute(quary,values)
        message = cursor.fetchall()
        if message is None:
            print("There is not message in db")
            return {"NoMs": True}
        return {"message": message,
                "current_id": user_id}
    except Exception as e:
        print(e)
        return {"error":True}
    finally:
        if cursor:
            cursor.close()
        if conn:
            conn.close()
            # db.commit()
# @chat.post("/api/chat")
# def chats(text : str):
