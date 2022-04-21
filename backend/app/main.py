import time
from urllib.request import Request
from fastapi import FastAPI
from config.database import engine
from auth import authrouter
from users import usersrouter
from chuong import chuongrouter
from tests import testrouter
from phanmuc import phanmucrouter
from noidung import noidungrouter
from keyphrase import keyphraserouter
from manager import managerrouter
from keyphrasenoidung import keyphrasenoidungrouter
from question import questionrouter
from models import initialize_sql


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

initialize_sql(engine)


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
app.include_router(managerrouter.router)
