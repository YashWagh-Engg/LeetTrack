from app.database import engine
from app.models.base import Base
from app.models.user import User

from fastapi import FastAPI

Base.metadata.create_all(bind=engine)
from app.routers.auth import router as auth_router


app = FastAPI()
app.include_router(auth_router)

@app.get("/")
def home():
    return {"message": "Leetcount Backend Running"}