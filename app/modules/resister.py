from fastapi import APIRouter
from app.modles import regi_op
from app.sqldatabase import get_cursor,db_pool
from app.alltocken.tocken_op import create_tocken
from app.checker.check_password import password
from app.mongo_user_data.mongo_data import mongoSave
regi = APIRouter()

@regi.get("/api/regi")
def regi_page():
    return [{"Message": "This is an regi page"}]

@regi.post('/api/regi')
async def regi_req(auth : regi_op):
    if not auth.e_valadation:
        return {"error": "your Email is not Verify yet"}
    
    cursor = None
    conn = None
    Insert =False
    try:
        cursor,conn = get_cursor()
        quary = "SELECT * FROM FOC.user_chat WHERE username = %s"
        value = (auth.username,)
        cursor.execute(quary,value)
        exist = cursor.fetchone()
        if exist:
            return {"dup" : True}
        else:
            check = password(auth.password)
            if check['check_point'] == False:
                if check['msg'] == "error":
                    print("somting went wrong in server side for password checke fix it")
                    return {"error" : "Server side error"}
                else:
                    return {"mis": check['msg']}
            quary = "INSERT INTO FOC.user_chat (username,password) VALUES (%s,%s)"
            cursor.execute(quary,(auth.username,auth.password))
            Insert = True
            user_id = cursor.lastrowid
            result = await mongoSave(user_id,auth.username,auth.Name,auth.DOB,auth.Email,auth.Bio,auth.Contry)
            if not result:
                if Insert and conn:
                    conn.rollback()
                Insert = False 
                return {'Error': "Mongodb is not working fine"}
            conn.commit()
            tok = create_tocken(auth.username,user_id)
            return {"token" : tok}
    except Exception as e:
        return {"error": f"{e}"}
    finally:
        if cursor:
            cursor.close()
        if conn:
            conn.close()
