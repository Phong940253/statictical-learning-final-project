from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from config.database import get_db
from models.usermodels import User
from dto.userschema import RegisterUser
from .chuongservice import ChuongService
from phanmuc.phanmucservice import PhanMucService
from config.token import get_currentUser

router = APIRouter(prefix="/chuong", tags=["Chuong"])


@router.get("/")
def getAllChuong(db: Session = Depends(get_db)):
    return ChuongService.get_allChuong(db=db)


@router.get("/phanmuc")
def getAllChuongPhanMuc(db: Session = Depends(get_db)):
    return {"chuong": ChuongService.get_allChuong(db=db),
            "phanmuc": PhanMucService.get_allPhanMuc(db=db)}

# @router.post("/")
# def createUser(user: RegisterUser, db: Session = Depends(get_db)):
#     return UserService.create_user(user, db)


# @router.get("/me")
# def getMe(current_user: User = Depends(get_currentUser)):
#     return current_user


# @router.put("/{userid}")
# def updateUser(userid: int, user: RegisterUser, db: Session = Depends(get_db)):
#     return UserService.update_user(userid=userid, user=user, db=db)


# @router.delete("/{userid}")
# def deleteUser(userid: int, db: Session = Depends(get_db)):
#     return UserService.deleteUser(userid=userid, db=db)
