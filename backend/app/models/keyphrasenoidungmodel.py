from email.policy import default
from turtle import circle
from xmlrpc.client import DateTime
from sqlalchemy import Column, BigInteger, ForeignKey, DateTime, Integer, Boolean, PrimaryKeyConstraint, String
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from backend.app.models.questionmodels import Question
from config.database import Base


class KeyphraseNoiDung(Base):
    __tablename__ = "keyphrasenoidung"

    id_keyphrase = Column(
        BigInteger,
        ForeignKey("keyphrasenoidung.id"))
    id_noidung = Column(BigInteger, ForeignKey("noidung.id"))

    name = Column(String(200))
    create_at = Column(DateTime, server_default=func.now())
    update_at = Column(DateTime, onupdate=func.now())

    keyphrase_noidung = relationship(
        "KeyphraseNoiDung",
        back_populates="keyphrase",
        casade="all, delete")

    noidung = relationship(
        "Noidung",
        back_populates="keyphrase",
        casade="all, delete")

    __table_args__ = (PrimaryKeyConstraint(id_keyphrase, id_noidung))
