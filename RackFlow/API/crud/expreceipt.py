from sqlalchemy.orm import Session
from schemas.expreceipt import ExpreceiptBase
from models.expreceipt import Expreceipt

def create_expreceipt(expreceipt: ExpreceiptBase,db: Session):
    db_expreceipt = Expreceipt(
        tenant_id=expreceipt.tenant_id,
        purchaseorder=expreceipt.purchaseorder
    )
    db.add(db_expreceipt)
    db.commit()
    db.refresh(db_expreceipt)
    return db_expreceipt


def get_expectedreceipt(db: Session, tenant_id: str):
    return db.query(Expreceipt).filter(Expreceipt.tenant_id == tenant_id).all()