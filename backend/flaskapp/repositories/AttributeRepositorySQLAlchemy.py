from ..intefaces.IAttributeRepository import IAttributeRepository
from ..extensions import db
from typing import List
from sqlalchemy.orm import Session, joinedload
from ..apps.attribute.models import Attribute

class AttributeRepositorySQLAlchemy(IAttributeRepository):
    def __init__(self, db_session: Session) -> None:
        self.db_session = db_session
    
    def get_all(self) -> List[Attribute]:
        return self.db_session.query(Attribute).all()
    
    def get_all_with_data(self) -> List[Attribute]:
        return self.db_session.query(Attribute).options(joinedload(Attribute.data)).all()
    
    def find_with_data(self, id:int) -> Attribute:
        return self.db_session.query(Attribute).options(joinedload(Attribute.data)).where(Attribute.id == id).first()
    
    def create(self, name: str) -> Attribute|bool:
        try:
            attribute = Attribute(name=name)
            self.db_session.add(attribute)
            self.db_session.commit()
            
            return attribute
        except:
            return False
        
    def update(self, id:int, name: str) -> Attribute|bool:
        attribute = self.db_session.query(Attribute).where(Attribute.id == id).first()
        
        if attribute is not None:
            attribute.name = name
            
            self.db_session.commit()
            return attribute
        else:
            return False
        
    def destroy(self, id: int) -> int:
        deleted_rows = self.db_session.query(Attribute).where(Attribute.id == id).delete()
        self.db_session.commit()
        
        if deleted_rows > 0:
            return id
        else:
            return False
        
    
attribute_repository = AttributeRepositorySQLAlchemy(db.session)