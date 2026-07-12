from sqlalchemy.orm import Session
from app.models.goal import Goal
from app.schemas.goal import GoalCreate



def create_or_update_goal(goal: GoalCreate, db: Session):

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
