import cloudinary
import cloudinary.uploader
from cloudinary.utils import cloudinary_url
from app.allSecret import cloudnary_sec

# Configuration       
cloudinary.config( 
    cloud_name = cloudnary_sec.name, 
    api_key = cloudnary_sec.api_key, 
    api_secret = cloudnary_sec.api_sec, # Click 'View API Keys' above to copy your API secret
    secure=True
)

def upload_cloudnery(file):
    result = cloudinary.uploader.upload(
        file.file,
        resource_type = "auto"
    )
    return result