from fastapi import APIRouter
from app.sqldatabase import get_cursor
user = APIRouter()

# @user.get("/api/user")
# def user_page():
#     return [{"Message": "This is an user page"}]

@user.get("/api/user/{id}")
def user_name(id : int):
    cusrsor = None
    conn = None
    try:
        cusrsor,conn = get_cursor()
        quary = "SELECT username FROM FOC.user_chat WHERE id = %s"
        value = (id,)
        cusrsor.execute(quary,value)
        res = cusrsor.fetchone()
        if not res:
            return {"User_No": True}
        return res
    except Exception as e:
        return {"error" : "Somting went wrong"}
    finally:
        if cusrsor:
            cusrsor.close()
        if conn:
            conn.close()