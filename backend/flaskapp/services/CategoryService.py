from typing import List
from ..apps.category.models import Category
from ..intefaces.ICategoryRepository import ICategoryRepository
from ..repositories.CategoryRepositorySQLAlchemy import category_repository

class CategoryService:
    def __init__(self, category_repository: ICategoryRepository) -> None:
        self.category_repository = category_repository
        
    def get_all(self) -> List[Category]:
        return self.category_repository.get_all()
    
    def create(self, name:str) -> Category|bool:
        return self.category_repository.create(name=name)
    
    def update(self, id:int, name: str) -> Category|bool:
        return self.category_repository.update(id, name)
    
    def destroy(self, id:int) -> int|bool:
        return self.category_repository.destroy(id)
        
        
category_service = CategoryService(category_repository);