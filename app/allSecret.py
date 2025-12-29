from dotenv import load_dotenv
import os

load_dotenv()

class sec():
    host=os.getenv("DB_HOST")
    user=os.getenv("DB_USER")
    password=os.getenv("DB_PASSWORD")
    database=os.getenv("DB_NAME")
    secret_key =os.getenv("SECRET_KEY")

class email_pass():
    compnay_email=os.getenv("Comp_Email")
    email_password=os.getenv("email_password")

class redis_sec():
    redis_host=os.getenv("redis_host")
    redis_password=os.getenv("redis_password")
    redis_port=os.getenv("redis_port")
    redis_db=os.getenv("redis_db")