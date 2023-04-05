from ..extensions import db
from sqlalchemy.orm import Session
from ..intefaces.IAttributeDataRepository import IAttributeDataRepository
from ..apps.attribute.models import AttributeData

class AttributeDataRepositorySQLAlchemy(IAttributeDataRepository):
    def __init__(self, db_session: Session) -> None:
        self.db_session = db_session
        
    def create(self, attribute_id: int, value: str) -> AttributeData|bool:
        try:
            attribute_data = AttributeData(attribute_id=attribute_id, value=value)
            self.db_session.add(attribute_data)
            self.db_session.commit()
            
            return attribute_data
        except:
            return False
        
    def update(self, id:int, value: str) -> AttributeData|bool:
        attribute_data = self.db_session.query(AttributeData).where(AttributeData.id == id).first()
        
        if attribute_data is not None:
            attribute_data.value = value
            
            self.db_session.commit()
            return attribute_data
        else:
            return False
        
    def destroy(self, id: int) -> int:
        deleted_rows = self.db_session.query(AttributeData).where(AttributeData.id == id).delete()
        self.db_session.commit()
        
        if deleted_rows > 0:
            return id
        else:
            return False
        
attribute_data_repository = AttributeDataRepositorySQLAlchemy(db.session)