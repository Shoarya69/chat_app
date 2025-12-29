from fastapi import APIRouter,Depends,HTTPException

from app.redisdatabase import get_redis
import hashlib
from app.email_verification.generate_otp import generate_otp
from app.email_verification.otp_email import send_otp_email
from app.email_verification.valid_email import is_valid_email
from app.modles import OtpRequsest,Otpverify

otp_sent = APIRouter()

@otp_sent.post("/api/otpsend")
async def otpSent(data: OtpRequsest, redis = Depends(get_redis)):
    valid_email = is_valid_email(data.email)
    if not valid_email:
        return {"error": "email is not valid please enter valid email"}
    otp = str(generate_otp())
    hashed = hashlib.sha256(otp.encode()).hexdigest()
    redis.setex(f"otp:{valid_email}", 300, hashed)
    message = await send_otp_email(valid_email,otp)
    print(message)
    if message['success']:
        print("OTP:", otp)  # prod me mat karna
        return message
    if message['error']:
        print(message)
        return {"error" : "Somting is wrong with server"}
    return {"message": "OTP sent"}

@otp_sent.post("/api/verify_otp")
def verify_otp(data : Otpverify, redis = Depends(get_redis)):
    key = f"otp:{data.email}"
    stored = redis.get(key)

    if not stored:
        return {"error": "OTP Expired or Invalid"}
        raise HTTPException(400, "OTP expired or invalid")

    if hashlib.sha256((data.otp).encode()).hexdigest() != stored:
        return {"error": "Wrong Otp"}
        raise HTTPException(400, "Wrong OTP")

    redis.delete(key)
    return {"verified": True}