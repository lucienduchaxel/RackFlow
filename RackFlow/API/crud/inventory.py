from sqlalchemy.orm import Session
from models.inventory import Inventory
from schemas.inventory import InventoryBase

def create_inventory(db: Session, inventory: InventoryBase):
    db_inventory = Inventory(
        tenant_id=inventory.tenant_id,
        itemid=inventory.itemid,
        packid=inventory.packid,
        location=inventory.location,
        quantity=inventory.quantity,
    )
    db.add(db_inventory)
    db.commit()
    db.refresh(db_inventory)
    return db_inventory

def get_inventory_by_tenant(db: Session, tenant_id: str):
    return db.query(Inventory).filter(Inventory.tenant_id == tenant_id).all()