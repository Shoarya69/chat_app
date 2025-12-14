
import mysql.connector
from mysql.connector import pooling
from app.allSecret import sec



# print(os.getenv("DB_HOST"))

db_pool = pooling.MySQLConnectionPool(
    pool_name="My_pool",
    pool_size=5,
    pool_reset_session=True,
    host=sec.host,
    user=sec.user,
    password=sec.password,
    database=sec.database,
    auth_plugin='mysql_native_password'
)


def get_cursor():
    try:
        conn = db_pool.get_connection()
        if conn is None:
            print("Pool returned None connection")
            return None, None

        cursor = conn.cursor(dictionary=True)
        return cursor, conn

    except Exception as e:
        print("Error getting DB connection:", e)
        return None, None
