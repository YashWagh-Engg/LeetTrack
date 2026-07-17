from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db
from app.dependencies import get_current_user

from app.models.notification import Notification
from app.models.user import User

router = APIRouter(
    prefix="/notification",
    tags=["Notification"]
)



@router.get("/")
def get_notifications(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):

    notifications = (
        db.query(Notification)
        .filter(
            Notification.user_id == current_user.id
        )
        .order_by(
            Notification.created_at.desc()
        )
        .all()
    )

    return notifications



@router.put("/{notification_id}")
def mark_as_read(
    notification_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):

    notification = (
        db.query(Notification)
        .filter(
            Notification.id == notification_id
        )
        .first()
    )

    if notification is None:
        raise HTTPException(
            status_code=404,
            detail="Notification not found"
        )

    # Security Check
    if notification.user_id != current_user.id:
        raise HTTPException(
            status_code=403,
            detail="Access denied"
        )

    notification.is_read = True

    db.commit()
    db.refresh(notification)

    return {
        "message": "Notification marked as read",
        "notification": notification
    }