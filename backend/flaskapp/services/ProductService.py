from ..intefaces.IProductRepository import IProductRepository
from ..repositories.ProductRepositorySQLAlchemy import product_repository
from ..apps.product.models import Product
from ..apps.product.dto import Product as ProductDTO, ProductPaginate
from typing import List

class ProductService:
    def __init__(self, product_repository: IProductRepository) -> None:
        self.product_repository = product_repository
        
    def get_with_sku(self, sku: str) -> Product|None:
        return self.product_repository.get_with_sku(sku)
        
    def get_all_products(self) -> List[Product]:
        return self.product_repository.get_all_parents()
    
    def get_all_sub_products(self, parent_id: int, page: int, per_page: int, name:str|None = None, category_id: int|None = None, stock_amount:int|None = None, stock_details:str|None = "fazla") -> ProductPaginate:
        return self.product_repository.get_all_sub_products_paginate(parent_id=parent_id, page=page, per_page=per_page, name=name, category_id=category_id, stock_amount=stock_amount, stock_details=stock_details)
    
    def get_details(self,id:int) -> Product:
        return self.product_repository.get_details(id)
    
    def update(self, product: ProductDTO) -> Product|bool:
        return self.product_repository.update(product=product)
    
    def create(self, product: ProductDTO) -> Product|bool:
        return self.product_repository.create(product=product)
    
    def update_all_stock_with_child_products(self) -> bool:
        return self.product_repository.update_all_stock_with_child_products()
    
    def update_stock_with_child_products(self, id:int) -> bool:
        return self.product_repository.update_stock_with_child_product(id)
    
    def get_all_parents_paginate(self, page: int, per_page: int, name:str|None = None, category_id: int|None = None, stock_amount:int|None = None, stock_details:str|None = "fazla") -> ProductPaginate:
        return self.product_repository.get_all_parents_paginate(page, per_page, name=name, category_id=category_id, stock_amount=stock_amount, stock_details=stock_details)
    
    def delete(self, id: int) -> bool:
        product = self.product_repository.find_one(id)
        
        if product is None:
            return False
        
        result = self.product_repository.delete(product.id)
        
        if result:
            if product.parent_id is not None:
                self.product_repository.update_stock_with_child_product(product.parent_id)
                
            return True
        
        return False
    
product_service = ProductService(product_repository)