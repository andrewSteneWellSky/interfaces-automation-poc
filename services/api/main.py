from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi import HTTPException
from starlette.exceptions import HTTPException as StarletteHTTPException
from routes import send_message, create_message

app = FastAPI()


app.include_router(send_message.router)
app.include_router(create_message.router)

origins = [
    "http://localhost:8000",
    "localhost:8000"
]


app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

@app.get("/api/v1")
async def root():
    return {"status": "ok"}

class SPAStaticFiles(StaticFiles):
    async def get_response(self, path: str, scope):
        try:
            return await super().get_response(path, scope)
        except (HTTPException, StarletteHTTPException) as ex:
            if ex.status_code == 404:
                return await super().get_response("index.html", scope)
            else:
                raise ex

app.mount("/", StaticFiles(directory="static/build/",html=True), name="spa-static-files")
