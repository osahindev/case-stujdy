from abc import ABC, abstractmethod
from ..apps.category.models import Category
from typing import List

class ICategoryRepository(ABC):
    @abstractmethod
    def get_all(self) -> List[Category]:
        pass

    @abstractmethod
    def create(self, name: str) -> Category|bool:
        pass    
    
    @abstractmethod
    def update(self, id: int, name: str) -> Category|bool:
        pass
    
    @abstractmethod
    def destroy(self, id: int) -> int:
        pass