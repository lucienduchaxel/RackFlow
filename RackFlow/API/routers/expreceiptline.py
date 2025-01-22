from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from database import SessionLocal
from schemas.expreceiptline import ExpreceiptlineBase
from crud.expreceiptline import create_expreceiptline
from typing import Annotated

router = APIRouter(prefix="/expreceiptline", tags=["expreceiptline"])

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

db_dependencies = Annotated[Session, Depends(get_db)]

@router.post("/")
async def post_expreceipt(expreceiptline: ExpreceiptlineBase,db: db_dependencies):
    return create_expreceiptline(expreceiptline,db)