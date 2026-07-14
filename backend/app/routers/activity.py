from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.activity import Activity

router = APIRouter(
    prefix="/activity",
    tags=["Activity"]
)
@router.get("/{user_id}")
def get_activity(user_id:int,
                 db:Session=Depends(get_db)):


    activity = db.query(Activity).filter(
        Activity.user_id == user_id
    ).order_by(
        Activity.created_at.desc()
    ).all()

    return activity