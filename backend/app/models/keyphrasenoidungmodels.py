from email.policy import default
from turtle import circle
from xmlrpc.client import DateTime
from sqlalchemy import Column, BigInteger, ForeignKey, DateTime, Integer, Boolean, PrimaryKeyConstraint, String
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from config.database import Base


class KeyphraseNoiDung(Base):
    __tablename__ = "keyphrasenoidung"
    id = Column(BigInteger, primary_key=True, index=True)

    id_keyphrase = Column(
        BigInteger,
        ForeignKey("keyphrase.id"))
    id_noidung = Column(BigInteger, ForeignKey("noidung.id"))

    create_at = Column(DateTime, server_default=func.now())
    update_at = Column(DateTime, onupdate=func.now())

    keyphrase = relationship(
        "Keyphrase",
        back_populates="keyphrase_noidung",
        cascade="all, delete")

    noidung = relationship(
        "Noidung",
        back_populates="keyphrase",
        cascade="all, delete")
