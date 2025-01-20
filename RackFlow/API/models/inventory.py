from sqlalchemy import Column, Integer, String
from database import Base

class Inventory(Base):
    __tablename__ = 'inventory'

    tenant_id = Column(String,index=True)
    itemid = Column(String,primary_key=True,index=True)
    location = Column(String,primary_key=True,index=True)
    packid = Column(String,primary_key=True,index=True)
    quantity = Column(Integer,index=True)