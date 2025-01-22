from sqlalchemy import Column, Integer, String
from database import Base

class Expreceipt(Base):
    __tablename__ = 'expreceipt'

    tenant_id = Column(String,index=True)
    expreceiptno = Column(Integer,primary_key=True,index=True)
    purchaseorder = Column(String,index=True)