from pydantic import BaseModel


class ExpreceiptBase(BaseModel):
    tenant_id: str
    purchaseorder: str