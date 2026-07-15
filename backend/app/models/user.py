from sqlalchemy import String, Integer, DateTime 
from sqlalchemy.orm import Mapped, mapped_column 
from datetime import datetime 
from sqlalchemy.orm import relationship 
from app.models.base import Base

class User(Base):
    __tablename__ = "users"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)

    name: Mapped[str] = mapped_column(String(100))

    email: Mapped[str] = mapped_column(
        String(100),
        unique=True,
        nullable=False
    )

    goals = relationship(
        "Goal",
        back_populates="user"
    )

    hashed_password: Mapped[str] = mapped_column(String)

    created_at: Mapped[datetime] = mapped_column(
        DateTime,
        default=datetime.utcnow
    )

    problems = relationship(
        "Problem",
        back_populates="user"
    )

    activities = relationship(
        "Activity",
        back_populates="user"
    )

    notifications = relationship(
        "Notification",
        back_populates="user"
    )