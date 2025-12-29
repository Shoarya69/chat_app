from fastapi import FastAPI,Depends
from app.internals.admin import admin
from app.modules import chat,auth, friends,resister,user,home,addfriend,searchfriend,notfication,email_otp,user_name,mongo_clean,self_profile
from app.websocket.websocket_12 import ws
from starlette.middleware.sessions import SessionMiddleware
from app.modules.error12 import register_exception_handlers
from app.allSecret import sec



def web():
    app = FastAPI()
    app.add_middleware(SessionMiddleware, secret_key=sec.secret_key)
    app.include_router(user.user)
    app.include_router(chat.chat)
    app.include_router(auth.auth)
    app.include_router(resister.regi)
    app.include_router(friends.friend)
    app.include_router(home.home)
    app.include_router(addfriend.add_f)
    app.include_router(searchfriend.search_f)
    app.include_router(notfication.notfi)
    app.include_router(email_otp.otp_sent)
    app.include_router(user_name.user_name_c)
    app.include_router(mongo_clean.clean)
    app.include_router(self_profile.self_prof)
    app.include_router(ws)
    register_exception_handlers(app)
    return app
