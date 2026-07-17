from datetime import datetime
from pydantic import BaseModel, Field

class ProblemCreate(BaseModel):
    title: str
    difficulty: str
    topic: str
    time_taken: int = Field(gt=0)


class ProblemResponse(BaseModel):
    id: int
    user_id: int
    title: str
    difficulty: str
    topic: str
    time_taken: int
    solved_at: datetime

    class Config:
        from_attributes = True