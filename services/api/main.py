from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes import send_message, create_message

app = FastAPI()

app.include_router(send_message.router)
app.include_router(create_message.router)

origins = [
    "http://localhost:3000",
    "localhost:3000"
]


app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

@app.get("/")
async def root():
    return {"status": "ok"}