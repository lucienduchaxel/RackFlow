from pydantic import BaseModel


class ExpreceiptlineBase(BaseModel):
    tenant_id: str
    expreceiptno: int
    lineno: int
    itemid: str
    uomcode: str
    quantity: int  
    quantityreceived: int