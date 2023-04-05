from abc import ABC, abstractmethod
from ..apps.attribute.models import AttributeData

class IAttributeDataRepository(ABC):
    
    @abstractmethod
    def create(self, attribute_id: int, value: str) -> AttributeData|bool:
        pass
    
    @abstractmethod
    def update(self, id:int, value: str) -> AttributeData|bool:
        pass
    
    @abstractmethod
    def destroy(self, id: int) -> int:
        pass