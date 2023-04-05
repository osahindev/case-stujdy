from abc import ABC, abstractmethod
from ..apps.auth.models import User, UserToken

class IUserRepository(ABC):
    
    @abstractmethod
    def find_one(self, id: int) -> User|None:
        pass
    
    @abstractmethod
    def find_with_email(self, email: str) ->User|None:
        pass
    
    @abstractmethod
    def find_token(self, token: str) -> UserToken|None:
        pass
    
    @abstractmethod
    def create_token_data(self, user_id: int, token: str) -> UserToken:
        pass