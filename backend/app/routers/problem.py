from datetime import date, timedelta

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db
from app.dependencies import get_current_user

from app.models.user import User
from app.models.problem import Problem
from app.models.activity import Activity

from app.schemas.problem import (
    ProblemCreate,
    ProblemResponse
)

router = APIRouter(
    prefix="/problem",
    tags=["Problem"]
)



@router.post("/", response_model=ProblemResponse)
def add_problem(
    problem: ProblemCreate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):

    new_problem = Problem(
        user_id=current_user.id,
        title=problem.title,
        difficulty=problem.difficulty,
        topic=problem.topic,
        time_taken=problem.time_taken
    )

    db.add(new_problem)
    db.commit()
    db.refresh(new_problem)

    activity = Activity(
        user_id=current_user.id,
        message=f"Solved '{problem.title}'"
    )

    db.add(activity)
    db.commit()

    return new_problem



@router.get("/", response_model=list[ProblemResponse])
def get_all_problems(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):

    problems = db.query(Problem).filter(
        Problem.user_id == current_user.id
    ).all()

    if not problems:
        raise HTTPException(
            status_code=404,
            detail="No problems found"
        )

    return problems



@router.delete("/{problem_id}")
def delete_problem(
    problem_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):

    problem = db.query(Problem).filter(
        Problem.id == problem_id
    ).first()

    if problem is None:
        raise HTTPException(
            status_code=404,
            detail="Problem not found"
        )

    if problem.user_id != current_user.id:
        raise HTTPException(
            status_code=403,
            detail="Access denied"
        )

    db.delete(problem)
    db.commit()

    return {
        "message": "Problem deleted successfully"
    }



@router.get("/stats")
def get_stats(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):

    problems = db.query(Problem).filter(
        Problem.user_id == current_user.id
    ).all()

    total = len(problems)

    easy = 0
    medium = 0
    hard = 0
    total_time = 0

    for problem in problems:

        total_time += problem.time_taken

        if problem.difficulty == "Easy":
            easy += 1

        elif problem.difficulty == "Medium":
            medium += 1

        elif problem.difficulty == "Hard":
            hard += 1

    average_time = 0

    if total > 0:
        average_time = total_time / total

    return {
        "totalSolved": total,
        "easy": easy,
        "medium": medium,
        "hard": hard,
        "averageTime": round(average_time, 2)
    }



@router.get("/streak")
def get_streak(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):

    problems = (
        db.query(Problem)
        .filter(
            Problem.user_id == current_user.id
        )
        .order_by(
            Problem.solved_at.desc()
        )
        .all()
    )

    if not problems:
        return {
            "current_streak": 0
        }

    unique_dates = []

    for problem in problems:

        if not problem.solved_at:
            continue

        solved_date = problem.solved_at.date()

        if not unique_dates or unique_dates[-1] != solved_date:
            unique_dates.append(solved_date)

    if not unique_dates:
        return {
            "current_streak": 0
        }

    today = date.today()

    if unique_dates[0] != today:
        return {
            "current_streak": 0
        }

    current_streak = 1

    for i in range(len(unique_dates) - 1):

        if unique_dates[i] - unique_dates[i + 1] == timedelta(days=1):
            current_streak += 1
        else:
            break

    return {
        "current_streak": current_streak
    }