from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database import get_db
from app.dependencies import get_current_user

from app.models.activity import Activity
from app.models.user import User

router = APIRouter(
    prefix="/activity",
    tags=["Activity"]
)



@router.get("/")
def get_activity(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):

    activities = (
        db.query(Activity)
        .filter(
            Activity.user_id == current_user.id
        )
        .order_by(
            Activity.created_at.desc()
        )
        .all()
    )

    return activities