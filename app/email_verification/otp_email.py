import smtplib
import socket
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from app.email_verification.generate_otp import generate_otp
from app.email_verification.html_reader import load_html_template
from app.allSecret import email_pass


async def send_otp_email(receiver_email:str, otp:int, name:str = "Customer"):
    sender_email = email_pass.compnay_email          # Apna Gmail daalo
    app_password = email_pass.email_password        # App Password daalo

    if not receiver_email:
        print("There is no resiver email here")
        return {"error": "This is server side error for email not recived"}
    if not name:
        print("Name is not hear Somting went wrong")
        return {"error" : "Server Email valaditon error"}
    subject = "Your Verification Code"

    # HTML template load karo
    body_html = load_html_template(
        template_dir="/home/shoarya/Desktop/Chat_app/app/email_verification",
        template_name="template.html",
        context={
            "otp": otp,
            "expiry_minutes": 5,
            "name": name
        }
    )


    # Email message banao
    msg = MIMEMultipart("alternative")
    msg['From'] = sender_email
    msg['To'] = receiver_email
    msg['Subject'] = subject

    # HTML version attach karo
    msg.attach(MIMEText(body_html, 'html'))
    try:
        server = smtplib.SMTP('smtp.gmail.com', 587)
        server.starttls()
        server.login(sender_email, app_password)
        server.sendmail(sender_email, receiver_email, msg.as_string())
        server.quit()
        print("OTP email with HTML template successfully sent!")
        return {"success" : "Check your email otp is there"}
    except socket.gaierror:
        return {
            "error": "No internet connection. Please check your network."
        }
    except smtplib.SMTPException:
        return {
            "error": "Email service temporarily unavailable. Try again later."
        }
    except Exception as e:
        print(f"Error: {e}")
    return {"error" : "Server side error"}


