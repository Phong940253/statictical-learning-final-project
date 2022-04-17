from email.policy import default
from turtle import circle
from xmlrpc.client import DateTime
from sqlalchemy import Column, BigInteger, ForeignKey, DateTime, Integer, Boolean, String
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from backend.app.models.questionmodels import Question
from config.database import Base


class Chuong(Base):
    __tablename__ = "chuong"

    id = Column(BigInteger, primary_key=True, index=True)
    name = Column(String(200))
    order = Column(Integer, default=0)

    create_at = Column(DateTime, server_default=func.now())
    update_at = Column(DateTime, onupdate=func.now())

    noidung = relationship(
        "Noidung",
        back_populates="chuong",
        casade="all, delete")
    phanmuc = relationship(
        "PhanMuc",
        back_populates="phanmuc",
        casade="all, delete")