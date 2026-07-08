from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.goal import Goal
from app.schemas.goal import GoalCreate

router = APIRouter(
    prefix="/goal",
    tags=["Goal"]
)

@router.post("/")
def create_goal(goal: GoalCreate, db: Session = Depends(get_db)):

    new_goal = Goal(
        user_id=goal.user_id,
        daily_goal=goal.daily_goal
    )

    db.add(new_goal)
    db.commit()
    db.refresh(new_goal)

    return {
        "message": "Goal Created Successfully"
    }