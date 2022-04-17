from email.policy import default
from xmlrpc.client import DateTime
from sqlalchemy import Column, Integer, BigInteger, SmallInteger, String, Boolean, DateTime
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from config.database import Base


class Test(Base):
    __tablename__ = "test"

    id = Column(BigInteger, primary_key=True, index=True)
    score = Column(SmallInteger)
    name = Column(String(50))
    email = Column(String(50))
    date_of_birth = Column(DateTime)
    password_hash = Column(String(200))
    veryfy_at = Column(DateTime)
    veryfy = Column(Boolean, default=False)
    create_at = Column(DateTime, server_default=func.now())
    update_at = Column(DateTime, onupdate=func.now())

    def __repr__(self):
        return f"<User {self.email}"
