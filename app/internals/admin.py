from fastapi import APIRouter

admin = APIRouter()

@admin.get("/admin")
def admin_page():
    return [{"Message": "This is an admin page"}]