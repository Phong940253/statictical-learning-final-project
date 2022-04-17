from fastapi import Depends
from config.database import get_db

from models.keyphrasenoidungmodels import KeyphraseNoiDung
from sqlalchemy.orm import Session
from dto.userschema import RegisterUser
from config.hashing import Hashing


class KeyphraseNoiDungService:
    pass
    # def get_allUser(db: Session):
    #     return db.query(Chuong).all()

    # def get_user(email: str, db: Session = Depends(get_db)):
    #     return db.query(Chuong).filter(Chuong.email == email).first()

    # def create_user(user: RegisterUser, db: Session = Depends(get_db)):
    #     db_user = Chuong(
    #         name=Chuong.name,
    #         email=Chuong.email,
    #         password=Hashing.bcrypt(Chuong.password),
    #         is_staff=Chuong.is_staff,
    #         is_active=Chuong.is_active,
    #     )

    #     db.add(db_user)
    #     db.commit()

    #     db.refresh(db_user)
    #     db_user.password = None

    #     return db_user

    # def update_user(userid: int, user: RegisterUser, db: Session):
    #     db_userid = db.query(User).filter(User.id == userid).first()

    #     db_userid.name = user.name
    #     db_userid.email = user.email
    #     db_userid.password = Hashing.bcrypt(user.password)
    #     db_userid.is_staff = user.is_staff
    #     db_userid.is_active = user.is_active

    #     db.commit()

    #     return db_userid

    # def deleteUser(userid: int, db: Session):
    #     db_userid = db.query(User).filter(User.id == userid).first()

    #     db.delete(db_userid)

    #     db.commit()

    #     return db_userid
