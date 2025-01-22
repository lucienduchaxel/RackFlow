from sqlalchemy.orm import Session
from models.expreceiptline import Expreceiptline
from models.expreceipt import Expreceipt
from schemas.receiving import ReceiveLine
from models.inventory import Inventory



def receive_line(lineReceived: ReceiveLine,db: Session):
    #DATA VALIDATION

    #Validate pack avl

    #Validate drop location


    #Get line from db

    expReceipt = db.query(Expreceipt).filter(Expreceipt.expreceiptno == lineReceived.expreceiptno).first()
    expReceiptLine =  db.query(Expreceiptline).filter(Expreceiptline.expreceiptno == expReceipt.expreceiptno).filter(Expreceiptline.lineno == lineReceived.lineno).first()
    
    
    ##NEW INV
    inventory_record = Inventory(
        tenant_id=expReceiptLine.tenant_id,
        itemid=expReceiptLine.itemid,
        packid=lineReceived.packid,
        location=lineReceived.location,
        quantity=lineReceived.quantity
    )
    db.add(inventory_record)
    db.commit()
    db.refresh(inventory_record)
    return