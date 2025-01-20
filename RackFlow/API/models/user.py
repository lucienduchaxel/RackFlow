from sqlalchemy import Column, Integer, String, UniqueConstraint
from database import Base
import datetime

class User(Base):
    __tablename__ = 'users'
    id = Column(Integer,primary_key=True)
    tenantid = Column(String(50),nullable=False)
    username = Column(String(50),nullable=False)
    email = Column(String(50),nullable=False)
    password = Column(String(100),nullable=False)

    __table_args__ = (
        UniqueConstraint('tenantid', 'username', name='uq_tenantid_username'),
    )
