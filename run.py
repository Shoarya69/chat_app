import uvicorn
from app.app_creater import web
from fastapi.middleware.cors import CORSMiddleware

app = web()


# origins = [
#     "http://localhost:517",     # Vite dev
#     "http://localhost:300",     # React dev
#     "https://yourdomain.com",    # Production frontend
# ]



# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=origins,       # ONLY these origins
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )

if __name__ == "__main__":
    uvicorn.run("run:app", host="0.0.0.0", port=8000, reload=True)
    # uvicorn.run("run:app", host="127.0.0.1", port=8000, reload=True)