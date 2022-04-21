import email
from fastapi import Depends
from config.database import get_db

from models.noidungmodels import NoiDung
from models.chuongmodels import Chuong
from models.phanmucmodels import PhanMuc
from sqlalchemy.orm import Session
from config.hashing import Hashing
from models.usermodels import User


class ManagerService:
    def seed(db: Session):
        db.add(User(
            name="Nguyen Van Phong",
            email="phong940253@gmail.com",
            password_hash=Hashing.bcrypt("01676940253"),
            verify=True))

        list_chuong = [
            "Array",
            "Linked List",
            "Stack",
            "Queue",
            "Binary Tree",
            "Binary Search Tree",
            "Heap",
            "Hashing",
            "Graph"
        ]
        db.add_all([Chuong(name=chuong) for chuong in list_chuong])
        db.commit()

        list_phanmuc = [
            [
                "Array Rotations",
                "Arrangement Rearrangement",
                "Order Statistics",
                "Range Queries",
                "Optimization Problems",
                "Array Sorting",
                "Array Searching"
            ],
            [
                "Singly Linked List"
            ]
        ]
        list_data_phanmuc = []
        for index, phanmuc in enumerate(list_phanmuc):
            for data in phanmuc:
                list_data_phanmuc.append(
                    PhanMuc(name=data, id_chuong=index + 1))
        print(list_data_phanmuc)
        db.add_all(list_data_phanmuc)
        db.commit()
        return []
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
