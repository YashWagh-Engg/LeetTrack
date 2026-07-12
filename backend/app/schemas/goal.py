from pydantic import BaseModel
from datetime import datetime

from pydantic import BaseModel, Field

class GoalCreate(BaseModel):
    daily_goal: int = Field(
        ge=1,
        le=20
    )


class GoalResponse(BaseModel):
    id: int
    user_id: int
    daily_goal: int
    created_at: datetime

    class Config:
        from_attributes = True