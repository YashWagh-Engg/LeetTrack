from sqlalchemy import String, ForeignKey, DateTime
from sqlalchemy.orm import Mapped, mapped_column, relationship
from datetime import datetime

from app.models.base import Base


class Notification(Base):

    __tablename__ = "notifications"

    id: Mapped[int] = mapped_column(primary_key=True)

    user_id: Mapped[int] = mapped_column(ForeignKey("users.id"))

    message: Mapped[str] = mapped_column(String)

    is_read: Mapped[bool] = mapped_column(default=False)

    user = relationship("User", back_populates="notifications")

    created_at: Mapped[datetime] = mapped_column(
        DateTime,
        default=datetime.utcnow
    )
    user = relationship(
    "User",
    back_populates="notifications"
)