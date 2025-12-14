from fastapi import APIRouter,Request
from app.modles import auth_op
from app.sqldatabase import get_cursor
from app.alltocken.tocken_op import create_tocken 
auth = APIRouter()




@auth.get("/api/login")
async def login_page():
    return [{"Message": "This is an login page"}]

@auth.post("/api/login")
async def login_req(auth : auth_op):
    cursor = None
    conn = None
    see = False
    try:
        see = False
        cursor,conn = get_cursor()
        quary = "SELECT id,password FROM FOC.user_chat WHERE username = %s"
        value = (auth.username,)
        cursor.execute(quary,value)
        exist = cursor.fetchone()
        if exist:
            password = exist['password']
            id  = exist['id']
            print(password)
            if password == auth.Password:
                tok = create_tocken(auth.username,id)
                see = True
                return {"token": tok}
            else:
                return{"error":"Password is not correct"}
        else:
            return{"error": "usernmae is not correct"}
    except Exception as e:
        return {"error": f"{e}"}
    finally:
        if cursor:
            cursor.close()
        if conn:
            conn.close()
        


