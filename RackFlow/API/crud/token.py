from sqlalchemy.orm import Session
from models.token import TokenTable

def create_token(db: Session, user_id: int, access_token: str, refresh_token: str) -> TokenTable:
    token_entry = TokenTable(
        user_id=user_id,
        access_toke=access_token,
        refresh_toke=refresh_token,
        status=True
    )
    db.add(token_entry)
    db.commit()
    db.refresh(token_entry)
    return token_entry

def revoke_tokens_by_user_id(db: Session, user_id: int) -> None:
    db.query(TokenTable).filter(TokenTable.user_id == user_id).update({"status": False})
    db.commit()
