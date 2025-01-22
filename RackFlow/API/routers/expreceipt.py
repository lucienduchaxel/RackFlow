from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from database import SessionLocal
from schemas.expreceipt import ExpreceiptBase
from crud.expreceipt import create_expreceipt
from typing import Annotated

router = APIRouter(prefix="/expreceipt", tags=["expreceipt"])

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

db_dependencies = Annotated[Session, Depends(get_db)]


@router.post("/")
async def post_expreceipt(expreceipt: ExpreceiptBase,db: db_dependencies):
    return create_expreceipt(expreceipt,db)
