from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from database import SessionLocal
from schemas.user import UserCreate
from crud.user import create_inventory, get_inventory_by_tenant
from typing import Annotated

router = APIRouter(prefix="/users", tags=["users"])

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

db_dependencies = Annotated[Session, Depends(get_db)]

@router.get("/tenant={tenant_id}")
async def get_inventory(tenant_id: str, db: db_dependencies):
    result = get_inventory_by_tenant(db, tenant_id)
    if not result:
        raise HTTPException(status_code=404, detail="No Inventory found")
    return result
