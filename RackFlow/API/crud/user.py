from sqlalchemy.orm import Session
from models.user import User
from schemas.user import UserCreate

def get_user_by_username(session: Session, username: str, tenantid: str) -> User:
    return session.query(User).filter(User.username == username).filter(User.tenantid == tenantid).first()

def create_user(session: Session, user: UserCreate, hashed_password: str) -> User:
    new_user = User(username=user.username, email=user.email, password=hashed_password, tenantid=user.tenantid)
    session.add(new_user)
    session.commit()
    session.refresh(new_user)
    return new_user
