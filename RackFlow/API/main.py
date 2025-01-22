from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import auth, inventory, receiving, expreceipt, expreceiptline
from database import engine
from models import Base

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Frontend origin
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods
    allow_headers=["*"],  # Allow all headers
)

Base.metadata.create_all(bind=engine)

# Include routers
app.include_router(inventory.router)
app.include_router(auth.router)
app.include_router(receiving.router)
app.include_router(expreceipt.router)
app.include_router(expreceiptline.router)

