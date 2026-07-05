from app.database import engine
from app.models.base import Base
from app.models.user import User

from fastapi import FastAPI

Base.metadata.create_all(bind=engine)

app = FastAPI()

@app.get("/")
def home():
    return {"message": "Leetcount Backend Running"}