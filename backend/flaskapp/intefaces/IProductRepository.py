from abc import ABC, abstractmethod
from typing import List
from ..apps.product.models import Product
from ..apps.product.dto import Product as ProductDTO, ProductPaginate

class IProductRepository(ABC):
    
    @abstractmethod
    def find_one(self, id: int) -> Product:
        pass
    
    @abstractmethod
    def get_with_sku(self, sku: str) -> Product|None:
        pass
    
    @abstractmethod
    def get_all_sub_products_paginate(self, parent_id: int,page: int, per_page: int, name:str|None = None, category_id: int|None = None, stock_amount:int|None = None, stock_details:str|None = "fazla") -> ProductPaginate:
        pass
    
    @abstractmethod
    def get_all_parents_paginate(self,page: int, per_page: int, name:str|None = None, category_id: int|None = None, stock_amount:int|None = None, stock_details:str|None = "fazla") -> ProductPaginate:
        pass
    
    @abstractmethod
    def get_details(self, id: int) -> Product:
        pass
    
    @abstractmethod
    def get_all_parents(self) -> List[Product]:
        pass
    
    @abstractmethod
    def update(self, product: ProductDTO) -> Product|bool:
        pass
    
    @abstractmethod
    def create(self, product: ProductDTO) -> Product:
        pass
    
    @abstractmethod
    def update_all_stock_with_child_products(self) -> bool:
        pass
    
    @abstractmethod
    def update_stock_with_child_product(self, id:int) -> bool:
        pass
    
    @abstractmethod
    def delete(self, id: int) -> bool:
        pass