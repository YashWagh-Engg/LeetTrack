from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.notification import Notification

router = APIRouter(
    prefix="/notification",
    tags=["Notification"]
)
@router.get("/{user_id}")
def get_notifications(user_id: int, db: Session = Depends(get_db)):

    notifications = db.query(Notification).filter(
        Notification.user_id == user_id
    ).order_by(
        Notification.created_at.desc()
    ).all()

    return notifications

@router.put("/{notification_id}")
def mark_as_read(notification_id: int,
                 db: Session = Depends(get_db)):

    notification = db.query(Notification).filter(
        Notification.id == notification_id
    ).first()

    if notification is None:
        raise HTTPException(
            status_code=404,
            detail="Notification not found"
        )

    notification.is_read = True

    db.commit()
    db.refresh(notification)

    return notification