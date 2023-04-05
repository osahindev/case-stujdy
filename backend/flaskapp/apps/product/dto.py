from typing import List,Optional

class Attribute:
    attribute_id: int
    attribute_data_id: int
    
    def __init__(self, attribute_id:int, attribute_data_id: int) -> None:
        self.attribute_id = attribute_id
        self.attribute_data_id = attribute_data_id
        
    def to_dict(self):
        return {
            "attribute_id": self.attribute_id,
            "attribute_data_id": self.attribute_data_id
        }

class Product:
    id: Optional[int]
    parent_id: Optional[int]
    sku: str
    name: str
    category_id: Optional[int]
    price: Optional[float]
    stock_amount: int
    attributes: Optional[List[Attribute]]
    
    def __init__(self, sku: str, name: str, stock_amount: int, category_id: Optional[int], price: Optional[float], parent_id:Optional[int], attributes: Optional[List[Attribute]],id: Optional[int] = None) -> None:
        self.id = id
        self.sku = sku
        self.parent_id = parent_id
        self.name = name
        self.category_id = category_id
        self.stock_amount = stock_amount
        self.price = price
        self.attributes = attributes
        
    def to_dict(self):
        return {
            "sku": self.sku,
            "name": self.name,
            "category_id": self.category_id,
            "stock_amount": self.stock_amount,
            "price": self.price,
            "attributes": [attribute.to_dict() for attribute in self.attributes]
        }
        
class ProductPaginate:
    page: int
    has_next: bool
    total: int
    has_prev: bool
    page_list: List[int]
    per_page: int
    items: List["Product"]
    
    def __init__(self,page: int, total: int, has_next: bool, has_prev: bool, page_list: List[int], items: List["Product"], per_page: int) -> None:
        self.per_page = per_page
        self.page = page
        self.total = total
        self.has_next = has_next
        self.has_prev = has_prev
        self.page_list = page_list
        self.items = items
    
    def to_dict(self):
        return {
            "page": self.page,
            "total": self.total,
            "per_page": self.per_page,
            "has_next": self.has_next,
            "has_prev": self.has_prev,
            "page_list": self.page_list,
            "items": [product.to_dict() for product in self.items]
        }