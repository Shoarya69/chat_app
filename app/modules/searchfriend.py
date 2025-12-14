from fastapi import APIRouter,Query
from app.mogodatabase import mongo
from app.sqldatabase import get_cursor
search_f = APIRouter()

@search_f.get("/api/search")
def search_friend(user : str = Query(..., min_length=1)):
    cursor = None
    conn = None
    try:
        cursor = None
        quary = "SELECT id,username FROM FOC.user_chat WHERE username LIKE %s"
        cursor,conn = get_cursor()
        like = f"%{user}%"
        cursor.execute(quary,(like,))
        result = cursor.fetchall()
        if not result:
            return {"No_one": True}
        return result
    except Exception as e:
        return ("error", "somting went wrong")
    finally:
        if cursor:    
            cursor.close()
        if conn:
            conn.close()