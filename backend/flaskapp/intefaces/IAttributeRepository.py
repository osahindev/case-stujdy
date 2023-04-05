from abc import ABC, abstractmethod
from ..apps.attribute.models import Attribute
from typing import List

class IAttributeRepository(ABC):
    
    @abstractmethod
    def get_all() -> List[Attribute]:
        pass
    
    @abstractmethod
    def get_all_with_data(self) -> List[Attribute]:
        pass
    
    @abstractmethod
    def find_with_data(self, id:int) -> Attribute:
        pass
    
    @abstractmethod
    def update(self, id:int, name: str) -> Attribute|bool:
        pass
    
    @abstractmethod
    def create(self, name: str) -> Attribute|bool:
        pass
    
    @abstractmethod
    def destroy(self, id: int) -> int:
        pass