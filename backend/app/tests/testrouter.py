from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from models.questioncontentmodels import QuestionContent
from models.questionmodels import Question
from config.database import get_db
from dto.sectionschema import SectionId
from .testservice import TestService
from sqlalchemy import select
from sqlalchemy.sql import func
from models.noidungmodels import NoiDung
from models.sectionmodels import Section
from typing import List

router = APIRouter(prefix="/tests", tags=["Tests"])


@router.get("/")
def get_all_test(db: Session = Depends(get_db)):
    return TestService.get_all_test(db=db)


@router.post("/")
def create_test(
        section: SectionId,
        db: Session = Depends(get_db)):
    db_test = TestService.create_test(
        db=db, id_user=section.id_user, time=section.time)

    db_question_content = db.execute(
        select(QuestionContent).join(Section).where(
            Section.id.in_(
                section.list_id)).order_by(
            func.rand()).limit(20)).all()
    list_question = [
        Question(
            id_test=db_test.id,
            id_question_content=question_content["QuestionContent"].id) for question_content in db_question_content]
    db.add_all(list_question)
    db.commit()

    [db.refresh(question) for question in list_question]
    return list_question


# @router.get("/me")
# def getMe(current_user: User = Depends(get_currentUser)):
#     return current_user


# @router.put("/{userid}")
# def updateUser(userid: int, user: RegisterUser, db: Session = Depends(get_db)):
#     return UserService.update_user(userid=userid, user=user, db=db)


# @router.delete("/{userid}")
# def deleteUser(userid: int, db: Session = Depends(get_db)):
#     return UserService.deleteUser(userid=userid, db=db)
