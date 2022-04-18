import time
from urllib.request import Request
from fastapi import FastAPI
from config.database import engine
from config.database import Base
from auth import authrouter
from users import usersrouter
from chuong import chuongrouter
from tests import testrouter
from phanmuc import phanmucrouter
from noidung import noidungrouter
from keyphrase import keyphraserouter
from keyphrasenoidung import keyphrasenoidungrouter
from question import questionrouter


from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


Base.metadata.create_all(bind=engine)


@app.get("/")
async def hello():
    return "Hello"


app.include_router(authrouter.router)
app.include_router(usersrouter.router)
app.include_router(testrouter.router)
app.include_router(questionrouter.router)
app.include_router(noidungrouter.router)
app.include_router(chuongrouter.router)
app.include_router(phanmucrouter.router)
app.include_router(keyphraserouter.router)
app.include_router(keyphrasenoidungrouter.router)
