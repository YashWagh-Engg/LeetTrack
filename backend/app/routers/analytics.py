from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database import get_db
from app.dependencies import get_current_user

from app.models.user import User
from app.models.problem import Problem

from app.schemas.analytics import (
    AnalyticsResponse,
    DifficultyStats
)

router = APIRouter(
    prefix="/analytics",
    tags=["Analytics"]
)


@router.get("/", response_model=AnalyticsResponse)
def get_analytics(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):

    problems = (
        db.query(Problem)
        .filter(Problem.user_id == current_user.id)
        .all()
    )

    total_problems = len(problems)

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

    average_time = (
        round(total_time / total_problems, 2)
        if total_problems > 0
        else 0
    )

    difficulty = DifficultyStats(
        easy=easy,
        medium=medium,
        hard=hard
    )    # -------------------------------
    # Topic Distribution
    # -------------------------------

    topic_counts = {}

    for problem in problems:

        if problem.topic in topic_counts:
            topic_counts[problem.topic] += 1
        else:
            topic_counts[problem.topic] = 1

    topics = []

    for topic, count in topic_counts.items():

        topics.append({
            "topic": topic,
            "count": count
        })

    topics.sort(
        key=lambda item: item["count"],
        reverse=True
    )    # -------------------------------
    # Monthly Progress
    # -------------------------------

    month_counts = {}

    for problem in problems:

        month = problem.solved_at.strftime("%b")

        if month in month_counts:
            month_counts[month] += 1
        else:
            month_counts[month] = 1

    month_order = [
        "Jan", "Feb", "Mar", "Apr",
        "May", "Jun", "Jul", "Aug",
        "Sep", "Oct", "Nov", "Dec"
    ]

    monthly_progress = []

    for month in month_order:

        if month in month_counts:

            monthly_progress.append({
                "month": month,
                "count": month_counts[month]
            })


    # -------------------------------
    # Current Streak
    # -------------------------------

    problems_sorted = sorted(
        problems,
        key=lambda problem: problem.solved_at,
        reverse=True
    )

    unique_dates = []

    for problem in problems_sorted:

        solved_date = problem.solved_at.date()

        if solved_date not in unique_dates:
            unique_dates.append(solved_date)

    current_streak = 0

    if unique_dates:

        from datetime import date, timedelta

        today = date.today()

        if unique_dates[0] == today:

            current_streak = 1

            for i in range(len(unique_dates) - 1):

                if unique_dates[i] - unique_dates[i + 1] == timedelta(days=1):
                    current_streak += 1
                else:
                    break


    # -------------------------------
    # Final Response
    # -------------------------------

    return AnalyticsResponse(

        total_problems=total_problems,

        average_time=average_time,

        current_streak=current_streak,

        difficulty=difficulty,

        topics=topics,

        monthly_progress=monthly_progress

    )