from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from fastapi import HTTPException
from app.database import get_db
from app.models.problem import Problem
from app.schemas.problem import ProblemCreate, ProblemResponse
from datetime import date, timedelta
from datetime import dates, timedelta

router = APIRouter(
    prefix="/problem",
    tags=["Problem"]
)
@router.get("/stats/{user_id}")
def get_stats(user_id: int, db: Session = Depends(get_db)):

    problems = db.query(Problem).filter(
        Problem.user_id == user_id
    ).all()
    total = len(problems)

    easy = 0
    medium = 0
    hard = 0
    total_time = 0
    average_time = 0

    for problem in problems:
        total_time += problem.time_taken

        if problem.difficulty == "Easy":
            easy += 1
        elif problem.difficulty == "Medium":
            medium += 1
        elif problem.difficulty == "Hard":
            hard += 1

    if total > 0:
        average_time = total_time / total

    return {
        "totalSolved": total,
        "easy": easy,
        "medium": medium,
        "hard": hard,
        "averageTime": round(average_time, 2)
    }

@router.get("/{user_id}", response_model=list[ProblemResponse])
def get_all_problems(user_id: int, db: Session = Depends(get_db)):

    problems = db.query(Problem).filter(
        Problem.user_id == user_id
    ).all()

    if not problems:
        raise HTTPException(
            status_code=404,
            detail="No problems found"
        )

    return problems

@router.delete("/{problem_id}")
def delete_problem(problem_id: int, db: Session = Depends(get_db)):

    problem = db.query(Problem).filter(
        Problem.id == problem_id
    ).first()

    if not problem:
        raise HTTPException(
            status_code=404,
            detail="Problem not found"
        )

    db.delete(problem)
    db.commit()

    return {
        "message": "Problem deleted successfully"
    }

@router.post("/", response_model=ProblemResponse)
def add_problem(problem: ProblemCreate, db: Session = Depends(get_db)):

    new_problem = Problem(
        user_id=problem.user_id,
        title=problem.title,
        difficulty=problem.difficulty,
        topic=problem.topic,
        time_taken=problem.time_taken
    )

    db.add(new_problem)
    db.commit()
    db.refresh(new_problem)

    return new_problem
@router.get("/streak/{user_id}")
def get_streak(user_id: int,db: Session = Depends(get_db)):
    problems = (
        db.query(Problem)
        .filter(Problem.user_id == user_id)
        .order_by(Problem.solved_at.desc())
        .all()
    )

    if not problems:
        return {"current_streak": 0}

    unique_dates = []
    for problem in problems:
        if not problem.solved_at:
            continue
        d = problem.solved_at.date()
        if not unique_dates or unique_dates[-1] != d:
            unique_dates.append(d)

    
    current_streak = 0

    today = date.today()

    if not dates:
       return {"current_streak": 0}

    if dates[0] != today:
       return {"current_streak": 0}
    
    if unique_dates:
        current_streak = 1
        for i in range(len(unique_dates) - 1):
            if unique_dates[i] - unique_dates[i + 1] == timedelta(days=1):
                current_streak += 1
            else:
                break

    return {"current_streak": current_streak}



