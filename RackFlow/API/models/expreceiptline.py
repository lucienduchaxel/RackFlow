from sqlalchemy import Column, Integer, String
from database import Base

class Expreceiptline(Base):
    __tablename__ = 'expreceiptline'

    tenant_id = Column(String,index=True)
    expreceiptno = Column(Integer,index=True,primary_key=True)
    lineno = Column(Integer,primary_key=True,index=True)
    itemid = Column(String,index=True)
    uomcode = Column(String,index=True)
    quantity = Column(Integer,index=True)
    quantityreceived = Column(Integer,index=True)