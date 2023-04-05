from ..intefaces.IAttributeRepository import IAttributeRepository
from ..repositories.AttributeRepositorySQLAlchemy import attribute_repository
from typing import List
from ..apps.attribute.models import Attribute

class AttributeService:
    def __init__(self, attribute_repository: IAttributeRepository) -> None:
        self.attribute_repository = attribute_repository
        
    def get_all(self) -> List[Attribute]:
        return self.attribute_repository.get_all()
    
    def get_all_with_data(self) -> List[Attribute]:
        return self.attribute_repository.get_all_with_data()
    
    def find_with_data(self, id:int) -> Attribute:
        return self.attribute_repository.find_with_data(id)
    
    def create(self, name:str) -> Attribute|bool:
        return self.attribute_repository.create(name=name)
    
    def update(self, id:int, value: str) -> Attribute|bool:
        return self.attribute_repository.update(id, value)
    
    def destroy(self, id:int) -> int|bool:
        return self.attribute_repository.destroy(id)
        
        
attribute_service = AttributeService(attribute_repository)