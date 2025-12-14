from fastapi import APIRouter
from fastapi.responses import FileResponse
home = APIRouter()

@home.get("/")
def home_page():
    return [{"Message": "This is an Home page"}]