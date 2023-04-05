from ..intefaces.IUserRepository import IUserRepository
from ..repositories.UserRepositorySQLAlchemy import user_repository
from ..apps.auth.models import User, UserToken
from flask import current_app
import bcrypt
import jwt
from datetime import datetime, timedelta

class UserService:
    def __init__(self, user_repository: IUserRepository) -> None:
        self.user_repository = user_repository
        
    def find_one(self, id: int) -> User|None:
        return self.user_repository.find_one(id)
    
    def find_token(self, token:str) -> UserToken|None:
        return self.user_repository.find_token(token)
    
    def find_with_email(self, email: str) ->User|None:
        return self.user_repository.find_with_email(email)
    
    def login(self, email: str, password: str) -> UserToken|bool:
        password_encoded = password.encode("utf-8")
        
        user = self.find_with_email(email=email)
        
        if user is not None:
            if bcrypt.checkpw(password_encoded, user.password):
                token = jwt.encode({
                    "user_id": user.id,
                    "first_name": user.first_name,
                    "last_name": user.last_name,
                    "current_time": datetime.utcnow().strftime('%B %d %Y - %H:%M:%S'),
                    "exp": datetime.utcnow() + timedelta(hours=3),
                }, current_app.config.get("SECRET_KEY"), algorithm="HS256")
                
                return self.user_repository.create_token_data(user_id=user.id, token=token)
        return False
            
        
user_service = UserService(user_repository)