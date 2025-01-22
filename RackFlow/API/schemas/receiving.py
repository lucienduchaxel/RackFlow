from pydantic import BaseModel


class ReceiveLine(BaseModel):
    tenant_id: str
    expreceiptno: int
    lineno: int
    quantity: int
    location: str
    packid: str