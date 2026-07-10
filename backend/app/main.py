from app.database import engine
from app.models.base import Base
from app.models.user import User

from fastapi import FastAPI

Base.metadata.create_all(bind=engine)
from app.routers.auth import router as auth_router

from app.dependencies.auth import get_current_user
from fastapi import Depends

from app.routers.goal import router as goal_router

from app.routers.problem import router as problem_router
app = FastAPI()
app.include_router(auth_router)
app.include_router(goal_router)
app.include_router(problem_router)

@app.get("/profile")
def profile(current_user=Depends(get_current_user)):
    return current_user

@app.get("/")
def home():
    return {"message": "Leetcount Backend Running"}