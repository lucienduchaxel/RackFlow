from sqlalchemy.orm import Session
from models.expreceiptline import Expreceiptline
from models.expreceipt import Expreceipt
from schemas.receiving import ReceiveLine
from schemas.inventory import InventoryExist
from models.inventory import Inventory



def receive_line(lineReceived: ReceiveLine,db: Session):
    #DATA VALIDATION

    #Validate pack avl

    #Validate drop location


    #Get line from db

    expReceipt = db.query(Expreceipt).filter(Expreceipt.expreceiptno == lineReceived.expreceiptno).first()
    
    expReceiptLine =  db.query(Expreceiptline).filter(
        Expreceiptline.expreceiptno == expReceipt.expreceiptno,
        Expreceiptline.lineno == lineReceived.lineno
    ).first()
    
    existingInventory = db.query(Inventory).filter(  
        Inventory.itemid == expReceiptLine.itemid,
        Inventory.location == lineReceived.location,
        Inventory.packid == lineReceived.packid,
        Inventory.tenant_id == lineReceived.tenant_id,
    ).first()
    
    
    

    if existingInventory: #Inventory is found and needs to be updated
        existingInventory.quantity += lineReceived.quantity
        db.commit()
        db.refresh(existingInventory)
    else:
        inventory_record = Inventory( #New instance of inventory
        tenant_id=expReceiptLine.tenant_id,
        itemid=expReceiptLine.itemid,
        packid=lineReceived.packid,
        location=lineReceived.location,
        quantity=lineReceived.quantity
        )
        db.add(inventory_record)
        db.commit()
        db.refresh(inventory_record)
        
        
    #Update line    
    expReceiptLine.quantityreceived += lineReceived.quantity
    db.commit()
    db.refresh(expReceiptLine)

    
    return