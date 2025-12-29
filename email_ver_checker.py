from app.email_verification.otp_email import send_otp_email
from app.email_verification.generate_otp import generate_otp

if __name__ == "__main__":
    receiver = input("Enter email adderess: ")  
    otp = generate_otp()
    print(f"OTP: {otp}")  
    send_otp_email(receiver, otp, "Shoarya")