from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from fastapi import HTTPException
from app.database import get_db
from app.models.goal import Goal
from app.schemas.goal import GoalCreate, GoalResponse
from app.models.user import User

router = APIRouter(
    prefix="/goal",
    tags=["Goal"]
)

@router.post("/", response_model=GoalResponse)
def create_goal(
    goal: GoalCreate,
    db: Session = Depends(get_db)
):
    existing_goal = db.query(Goal).filter(
    Goal.user_id == goal.user_id
).first()

    if existing_goal:
        existing_goal.daily_goal = goal.daily_goal
        db.commit()
        db.refresh(existing_goal)
        return existing_goal

    new_goal = Goal(
    user_id=goal.user_id,
    daily_goal=goal.daily_goal
)

    db.add(new_goal)
    db.commit()
    db.refresh(new_goal)

    return new_goal

@router.get("/{user_id}", response_model=GoalResponse)
def get_goal(
    user_id: int,
    db: Session = Depends(get_db)
):

    goal = db.query(Goal).filter(
        Goal.user_id == user_id
    ).first()

    if goal is None:
        raise HTTPException(
            status_code=404,
            detail="Goal not found"
        )

    return goal
