from pydantic import BaseModel, Field


class ProblemCreate(BaseModel):
    user_id: int
    title: str
    difficulty: str
    topic: str
    time_taken: int = Field(gt=0)