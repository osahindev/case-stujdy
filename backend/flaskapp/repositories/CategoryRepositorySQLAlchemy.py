from ..intefaces.ICategoryRepository import ICategoryRepository
from typing import List
from ..apps.category.models import Category
from ..extensions import db
from sqlalchemy.orm import Session

class CategoryRepositorySQLAlchemy(ICategoryRepository):
    def __init__(self, db_session: Session) -> None:
        self.db_session = db_session
        
    def get_all(self) -> List[Category]:
        categories = self.db_session.query(Category).all()
        return categories
        
    def create(self, name: str) -> Category|bool:
        try:
            category = Category(name=name)
            self.db_session.add(category)
            self.db_session.commit()
            
            return category
        except:
            return False
        
    def update(self,id: int, name: str) -> Category|bool:
        category = self.db_session.query(Category).where(Category.id == id).first()
        
        if category is not None:
            category.name = name
            
            self.db_session.commit()
            return category
        else:
            return False
    
    def destroy(self, id: int) -> int|bool:
        deleted_rows = self.db_session.query(Category).where(Category.id == id).delete()
        self.db_session.commit()
        
        if deleted_rows > 0:
            return id
        else:
            return False
        
    
category_repository = CategoryRepositorySQLAlchemy(db.session)