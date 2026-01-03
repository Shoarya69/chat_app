from fastapi import APIRouter, UploadFile, File
from app.cloudnery_upload.cloudnery_op import upload_cloudnery
file_s = APIRouter()

@file_s.post("/api/file_save")
def file_save(file: UploadFile = File(...)):
    if not file:
        return {"errro": "No file error"}
    try:
        res =upload_cloudnery(file)
        print(res)
        return {
            "type": res['resource_type'],
            "url": res['url']
        }
    except Exception as e:
        print(e)
        return {"error": "Somting went Wrong"}