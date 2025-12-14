import uvicorn
from app.app import web

app = web()
if __name__ == "__main__":
    uvicorn.run("run:app", host="127.0.0.1", port=8000, reload=True)