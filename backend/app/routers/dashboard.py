from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import func

from app.database import get_db
from app.models.goal import Goal
from app.models.problem import Problem

router = APIRouter(
    prefix="/dashboard",
    tags=["Dashboard"]
)

@router.get("/{user_id}")
def dashboard(user_id: int, db: Session = Depends(get_db)):
    goal = db.query(Goal).filter(
    Goal.user_id == user_id
).first()
    
    total = db.query(Problem).filter(
    Problem.user_id == user_id
).count()
    
    easy = db.query(Problem).filter(
    Problem.user_id == user_id,
    Problem.difficulty == "Easy"
).count()
    
    medium = db.query(Problem).filter(
    Problem.user_id == user_id,
    Problem.difficulty == "Medium"
).count()
    
    hard = db.query(Problem).filter(
    Problem.user_id == user_id,
    Problem.difficulty == "Hard"
).count()
    
    average = db.query(
    func.avg(Problem.time_taken)
).filter(
    Problem.user_id == user_id
).scalar()
    
    return {
    "daily_goal": goal.daily_goal if goal else 0,

    "total_problems": total,

    "easy": easy,

    "medium": medium,

    "hard": hard,

    "average_time": round(average, 2) if average else 0
}
    