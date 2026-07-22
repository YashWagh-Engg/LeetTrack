from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import func

from app.database import get_db

from app.models.user import User
from app.models.goal import Goal
from app.models.problem import Problem
from app.models.activity import Activity
from app.models.notification import Notification
from app.dependencies import get_current_user

router = APIRouter(
    prefix="/dashboard",
    tags=["Dashboard"]
)


@router.get("/")
def get_dashboard(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    user_id = current_user.id
    
    user = db.query(User).filter(
        User.id == user_id
    ).first()

    if not user:
        return {"message": "User not found"}

    
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

    solved_today = db.query(Problem).filter(
        Problem.user_id == user_id,
        func.date(Problem.solved_at) == func.current_date()
    ).count()

    
    remaining_goal = 0

    if goal:
        remaining_goal = max(
            goal.daily_goal - solved_today,
            0
        )

    
    activities = (
        db.query(Activity)
        .filter(Activity.user_id == user_id)
        .order_by(Activity.created_at.desc())
        .limit(5)
        .all()
    )

   
    notifications = (
        db.query(Notification)
        .filter(
            Notification.user_id == user_id,
            Notification.is_read == False
        )
        .all()
    )

    
    current_streak = 0

    
    return {
        "username": user.name,
        "email": user.email,

        "daily_goal": goal.daily_goal if goal else 0,
        "solved_today": solved_today,
        "remaining_goal": remaining_goal,

        "total_problems": total,
        "easy": easy,
        "medium": medium,
        "hard": hard,

        "average_time": round(average, 2) if average else 0,

        "current_streak": current_streak,

        "recent_activity": [
    {
        "activity": activity.message,
        "created_at": activity.created_at
    }
    for activity in activities
],

        "notifications": [
            {
                "message": notification.message,
                "is_read": notification.is_read,
                "created_at": notification.created_at
            }
            for notification in notifications
        ]
    }