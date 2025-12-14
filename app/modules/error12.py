from fastapi import Request
from fastapi.responses import JSONResponse
from starlette.exceptions import HTTPException as StarletteHTTPException

def register_exception_handlers(app):

    # --- 404 Not Found ---
    @app.exception_handler(StarletteHTTPException)
    async def custom_http_exception_handler(request: Request, exc: StarletteHTTPException):
        if exc.status_code == 404:
            return JSONResponse(
                status_code=404,
                content={
                    "error": "Page not found",
                    "message": f"The requested URL {request.url.path} was not found on the server."
                },
            )

        # other HTTP exceptions (401, 403, etc.)
        return JSONResponse(
            status_code=exc.status_code,
            content={"error": exc.detail or "HTTP Exception"},
        )

    # --- 500 Internal Server Error ---
    @app.exception_handler(Exception)
    async def general_exception_handler(request: Request, exc: Exception):
        return JSONResponse(
            status_code=500,
            content={
                "error": "Something went wrong",
                "message": "An unexpected error occurred on the server.",
                "path": str(request.url),
            },
        )

    return app
