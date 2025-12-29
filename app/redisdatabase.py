import redis
from app.allSecret import redis_sec

r = redis.Redis(
    host=redis_sec.redis_host,
    port=redis_sec.redis_port,
    db=redis_sec.redis_db,
    decode_responses=True

)
def get_redis():
    return r