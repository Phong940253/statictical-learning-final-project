from email.policy import default
from turtle import circle
from xmlrpc.client import DateTime
from sqlalchemy import Column, BigInteger, ForeignKey, DateTime, Integer, Boolean, String
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from config.database import Base


class PhanMuc(Base):
    __tablename__ = "phanmuc"

    id = Column(BigInteger, primary_key=True, index=True)
    name = Column(String(200))
    order = Column(Integer, default=0)
    id_chuong = Column(BigInteger, ForeignKey("chuong.id"))
    chuong = relationship(
        "Chuong",
        back_populates="phanmuc",
        cascade="all, delete")
    create_at = Column(DateTime, server_default=func.now())
    update_at = Column(DateTime, onupdate=func.now())

    noidung = relationship("Noidung", back_populates="phanmuc")
