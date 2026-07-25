from pydantic import BaseModel


class DifficultyStats(BaseModel):
    easy: int
    medium: int
    hard: int


class TopicStats(BaseModel):
    topic: str
    count: int


class MonthlyStats(BaseModel):
    month: str
    count: int


class AnalyticsResponse(BaseModel):
    total_problems: int
    average_time: float
    current_streak: int

    difficulty: DifficultyStats

    topics: list[TopicStats]

    monthly_progress: list[MonthlyStats]