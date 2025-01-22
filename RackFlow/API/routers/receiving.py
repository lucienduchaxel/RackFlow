from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from database import SessionLocal
from schemas.receiving import ReceiveLine
from crud.receiving import receive_line
from typing import Annotated

router = APIRouter(prefix="/receiving", tags=["reiciving"])


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

db_dependencies = Annotated[Session, Depends(get_db)]

@router.post("/receiveline")
async def receive_new_line(expreceiptline: ReceiveLine,db: db_dependencies):
    return receive_line(expreceiptline,db)