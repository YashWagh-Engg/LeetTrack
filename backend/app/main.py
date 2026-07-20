from app.database import engine
from app.models.base import Base
from app.models.user import User
from app.models.notification import Notification
from app.routers.notification import router as notification_router
from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI

Base.metadata.create_all(bind=engine)

from app.routers.auth import router as auth_router
from app.routers.goal import router as goal_router
from app.routers.dashboard import router as dashboard_router
from app.routers.problem import router as problem_router
from app.routers.activity import router as activity_router

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_router)
app.include_router(goal_router)
app.include_router(problem_router)
app.include_router(dashboard_router)
app.include_router(activity_router)
app.include_router(notification_router)

@app.get("/")
def home():
    return {"message": "LeetTrack Backend Running"}