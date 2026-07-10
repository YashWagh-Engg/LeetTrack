from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.problem import Problem
from app.schemas.problem import ProblemCreate

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
@router.post("/")
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

