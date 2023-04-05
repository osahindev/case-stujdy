from ..intefaces.IUserRepository import IUserRepository
from sqlalchemy.orm import Session
from ..extensions import db
from ..apps.auth.models import User, UserToken
from datetime import datetime, timedelta

class UserRepository(IUserRepository):
    def __init__(self, db_session: Session):
        self.db_session = db_session
        
    def find_one(self, id: int) -> User|None:
        return self.db_session.query(User).where(User.id == id).first()
    
    def find_token(self, token: str) -> UserToken|None:
        return self.db_session.query(UserToken).where(UserToken.token == token).first()
    
    def find_with_email(self, email: str) ->User|None:
        return self.db_session.query(User).where(User.email == email).first()
    
    def delete_user_tokens(self, user_id: int) -> None:
        self.db_session.query(UserToken).where(UserToken.user_id == user_id).delete()
        self.db_session.commit()
    
    def create_token_data(self, user_id: int, token: str) -> UserToken:
        self.delete_user_tokens(user_id=user_id)
        
        last_date = datetime.utcnow() + timedelta(hours=3)
        user_token = UserToken(user_id=user_id, token=token, last_date=last_date)
        self.db_session.add(user_token)
        self.db_session.commit()
        
        return user_token
        
user_repository = UserRepository(db.session)