from email.policy import default
from turtle import circle
from xmlrpc.client import DateTime
from sqlalchemy import Column, BigInteger, ForeignKey, DateTime, Integer, Boolean, String
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from config.database import Base


class NoiDung(Base):
    __tablename__ = "noidung"

    id = Column(BigInteger, primary_key=True, index=True)
    id_chuong = Column(BigInteger, ForeignKey("chuong.id"))
    chuong = relationship(
        "Chuong",
        back_populates="noidung",
        cascade="all, delete")

    id_phanmuc = Column(BigInteger, ForeignKey("phanmuc.id"))
    phanmuc = relationship(
        "PhanMuc",
        back_populates="noidung",
        cascade="all, delete")

    yeu_to_tri_thuc = Column(String(200))

    content = Column(String(2000))
    order = Column(Integer, default=0)

    id_test = Column(BigInteger, ForeignKey("test.id"))
    test = relationship(
        "Test",
        back_populates="question",
        cascade="all, delete")

    id_root_noidung_keyphrase = Column(
        BigInteger, ForeignKey("keyphrasenoidung.id"))
    root_noidung_keyphrase = relationship(
        "KeyPhraseNoidung",
        back_populates="noidung",
        cascade="all, delete")

    id_relation_noidung_keyphrase = Column(
        BigInteger, ForeignKey("keyphrasenoidung.id"))
    relation_noidung_keyphrase = relationship(
        "KeyPhraseNoidung",
        back_populates="noidung",
        cascade="all, delete")

    type = Column(String(200))
    correct_answer = Column(String(200))
    create_at = Column(DateTime, server_default=func.now())
    update_at = Column(DateTime, onupdate=func.now())

    question = relationship(
        "Question",
        back_populates="noidung",
        cascade="all, delete")
    keyphrase_noidung = relationship(
        "KeyPhraseNoidung",
        back_populates="noidung",
        cascade="all, delete")
