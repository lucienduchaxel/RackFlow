from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from database import SessionLocal
from schemas.user import UserCreate, Requestdetails, Changepassword
from schemas.token import TokenSchema
from crud.user import get_user_by_username, create_user
from crud.token import create_token
from typing import Annotated
from utils.hashedPassword import get_hashed_password, verify_password
from utils.token import create_access_token, create_refresh_token
from utils.auth_bearer import JWTBearer
from models.user import User

#dependencies=Depends(JWTBearer())  to add token auth

router = APIRouter(prefix="/auth", tags=["auth"])

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.post("/register")
def register_user(user: UserCreate, db: Session = Depends(get_db)):
    existing_user = get_user_by_username(db, user.username, user.tenantid)
    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    hashed_password = get_hashed_password(user.password)

    # Create a new user
    new_user = create_user(db, user, hashed_password,)

    return {"message": "User created successfully", "user_id": new_user.id}



@router.post("/login", response_model=TokenSchema)
def login(request: Requestdetails, db: Session = Depends(get_db)):
    # Retrieve the user by email
    user = get_user_by_username(db, request.username, request.tenantid)
    if user is None:
        raise HTTPException(status_code=400, detail="Incorrect email")

    # Verify the password
    if not verify_password(request.password, user.password):
        raise HTTPException(status_code=400, detail="Incorrect password")

    # Generate tokens
    access_token = create_access_token(user.id)
    refresh_token = create_refresh_token(user.id)

    # Store tokens in the database
    create_token(db, user_id=user.id, access_token=access_token, refresh_token=refresh_token)

    return {
        "access_token": access_token,
        "refresh_token": refresh_token,
    }

@router.get('/getusers')
def getusers(session: Session = Depends(get_db)):
    user = session.query(User).all()
    return user



#TO BE IMPLEMENTED
# @app.post('/change-password')
# def change_password(request: schemas.changepassword, db: Session = Depends(get_session)):
#     user = db.query(models.User).filter(models.User.email == request.email).first()
#     if user is None:
#         raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="User not found")
    
#     if not verify_password(request.old_password, user.password):
#         raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Invalid old password")
    
#     encrypted_password = get_hashed_password(request.new_password)
#     user.password = encrypted_password
#     db.commit()
    
#     return {"message": "Password changed successfully"}

# @app.post('/logout')
# def logout(dependencies=Depends(JWTBearer()), db: Session = Depends(get_session)):
#     token=dependencies
#     payload = jwt.decode(token, JWT_SECRET_KEY, ALGORITHM)
#     user_id = payload['sub']
#     token_record = db.query(models.TokenTable).all()
#     info=[]
#     for record in token_record :
#         print("record",record)
#         if (datetime.utcnow() - record.created_date).days >1:
#             info.append(record.user_id)
#     if info:
#         existing_token = db.query(models.TokenTable).where(TokenTable.user_id.in_(info)).delete()
#         db.commit()
        
#     existing_token = db.query(models.TokenTable).filter(models.TokenTable.user_id == user_id, models.TokenTable.access_toke==token).first()
#     if existing_token:
#         existing_token.status=False
#         db.add(existing_token)
#         db.commit()
#         db.refresh(existing_token)
#     return {"message":"Logout Successfully"} 