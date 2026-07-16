from pydantic import BaseModel


class DashboardResponse(BaseModel):
    username: str
    daily_goal: int
    total_problems: int
    current_streak: int
    recent_activity: list
    notifications: list