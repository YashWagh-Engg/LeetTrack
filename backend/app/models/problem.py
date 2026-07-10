from sqlalchemy import Integer, String, ForeignKey, DateTime
from sqlalchemy.orm import Mapped, mapped_column, relationship
from datetime import datetime

from app.models.base import Base


class Problem(Base):

    __tablename__ = "problems"

    id: Mapped[int] = mapped_column(primary_key=True)

    user_id: Mapped[int] = mapped_column(
        ForeignKey("users.id")
    )

    title: Mapped[str] = mapped_column(String)

    difficulty: Mapped[str] = mapped_column(String)

    topic: Mapped[str] = mapped_column(String)

    time_taken: Mapped[int] = mapped_column(Integer)

    solved_at: Mapped[datetime] = mapped_column(
        DateTime,
        default=datetime.utcnow
    )

    user = relationship(
        "User",
        back_populates="problems"
    )