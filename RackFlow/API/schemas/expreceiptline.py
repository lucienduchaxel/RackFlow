from pydantic import BaseModel


class ExpreceiptlineBase(BaseModel):
    tenant_id: str
    expreceiptno: str
    lineno: int
    itemid: str
    uomcode: str
    quantity: int