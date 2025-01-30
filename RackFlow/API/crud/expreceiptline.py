from sqlalchemy.orm import Session
from schemas.expreceiptline import ExpreceiptlineBase
from models.expreceiptline import Expreceiptline


def create_expreceiptline(expreceiptline: ExpreceiptlineBase,db: Session):
    db_expreceiptline = Expreceiptline(
        tenant_id = expreceiptline.tenant_id,
        expreceiptno = expreceiptline.expreceiptno,
        lineno = expreceiptline.lineno,
        itemid = expreceiptline.itemid,
        uomcode = expreceiptline.uomcode,
        quantity = expreceiptline.quantity,
        quantityreceived = 0
    )
    db.add(db_expreceiptline)
    db.commit()
    db.refresh(db_expreceiptline)
    return db_expreceiptline


def get_expreceiptlines(db: Session, tenant_id: str, expreceiptno: int):
    return db.query(Expreceiptline).filter(Expreceiptline.tenant_id == tenant_id).filter(Expreceiptline.expreceiptno == expreceiptno).all()