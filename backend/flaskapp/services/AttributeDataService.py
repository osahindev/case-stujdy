from ..intefaces.IAttributeDataRepository import IAttributeDataRepository
from ..repositories.AttributeDataRepositorySQLAlchemy import attribute_data_repository
from ..apps.attribute.models import AttributeData

class AttributeDataService:
    def __init__(self, attribute_data_repository: IAttributeDataRepository) -> None:
        self.attribute_data_repository = attribute_data_repository
        
    def create(self, attribute_id: int, value: str) -> AttributeData|bool:
        return self.attribute_data_repository.create(attribute_id=attribute_id, value=value)
        
    def destroy(self, id:int) -> int|bool:
        return self.attribute_data_repository.destroy(id)
    
    def update(self, id:int, name: str) -> AttributeData|bool:
        return self.attribute_data_repository.update(id, name)
    
attribute_data_service = AttributeDataService(attribute_data_repository)