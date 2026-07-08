from pydantic import BaseModel

class GoalCreate(BaseModel):
    user_id: int
    daily_goal: int