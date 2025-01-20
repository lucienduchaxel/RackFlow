from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from database import SessionLocal
from schemas.inventory import InventoryBase
from crud.inventory import create_inventory, get_inventory_by_tenant
from typing import Annotated

router = APIRouter(prefix="/inventory", tags=["inventory"])

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

db_dependencies = Annotated[Session, Depends(get_db)]

@router.post("/")
async def post_inventory(inventory: InventoryBase, db: db_dependencies):
    return create_inventory(db, inventory)

@router.get("/tenant={tenant_id}")
async def get_inventory(tenant_id: str, db: db_dependencies):
    result = get_inventory_by_tenant(db, tenant_id)
    if not result:
        raise HTTPException(status_code=404, detail="No Inventory found")
    return result
