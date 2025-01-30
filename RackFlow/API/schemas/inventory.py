from pydantic import BaseModel


class InventoryBase(BaseModel):
    tenant_id: str
    itemid: str
    packid: str
    location: str
    quantity: int 


class InventoryExist(BaseModel):
    tenant_id: str
    itemid: str
    packid: str
    location: str