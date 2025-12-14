from app.checker.password_check import check

def password(s: str):
    try:
        a = check(s)
        return {"msg" : a.a, "check_point": a.ok}
    except Exception as e:
        print(e)
        return {"msg" : "error", "check_point": False}         


