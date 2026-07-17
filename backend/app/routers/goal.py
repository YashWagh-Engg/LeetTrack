from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db
from app.dependencies import get_current_user

from app.models.goal import Goal
from app.models.user import User

from app.schemas.goal import GoalCreate, GoalResponse

router = APIRouter(
    prefix="/goal",
    tags=["Goal"]
)



@router.post("/", response_model=GoalResponse)
def create_goal(
    goal: GoalCreate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):

    existing_goal = db.query(Goal).filter(
        Goal.user_id == current_user.id
    ).first()

    if existing_goal:
        existing_goal.daily_goal = goal.daily_goal

        db.commit()
        db.refresh(existing_goal)

        return existing_goal

    new_goal = Goal(
        user_id=current_user.id,
        daily_goal=goal.daily_goal
    )

    db.add(new_goal)
    db.commit()
    db.refresh(new_goal)

    return new_goal



@router.get("/", response_model=GoalResponse)
def get_goal(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):

    goal = db.query(Goal).filter(
        Goal.user_id == current_user.id
    ).first()

    if goal is None:
        raise HTTPException(
            status_code=404,
            detail="Goal not found"
        )

    return goal