from typing import List
from ..extensions import db
from sqlalchemy import func, update, select
from sqlalchemy.orm import Session, joinedload, aliased
from ..apps.product.models import Product, product_attribute_data_pivot_table
from ..apps.product.dto import ProductPaginate, Product as ProductDTO
from ..intefaces.IProductRepository import IProductRepository

class ProductRepositorySQLAlchemy(IProductRepository):
    def __init__(self, db_session: Session):
        self.db_session = db_session
        
    def find_one(self, id: int) -> Product:
        return self.db_session.query(Product).where(Product.id == id).first()
        
    def get_with_sku(self, sku: str) -> Product|None:
        return db.session.query(Product).where(Product.sku == sku).first()
    
    def get_all_sub_products_paginate(self, parent_id: int,page: int, per_page: int, name:str|None = None, category_id: int|None = None, stock_amount:int|None = None, stock_details:str|None = "fazla") -> ProductPaginate:
        where = [Product.parent_id == parent_id]
        products = self.db_session.query(Product)
        
        if name is not None:
            where.append(Product.name.like("%{}%".format(name)))
            
        if category_id is not None:
            where.append(Product.category_id == category_id)
            
        if stock_amount is not None and stock_amount > 0:
            if stock_details == "fazla":
                where.append(Product.stock_amount >= stock_amount)
            if stock_details == "az":
                where.append(Product.stock_amount <= stock_amount)
        
        products = products.where(*where).order_by(Product.id.desc()).paginate(page=page, per_page=per_page)
        
        return ProductPaginate(
            page=page,
            per_page=per_page,
            has_next=products.has_next,
            has_prev=products.has_prev,
            total= products.total,
            page_list= [iter_page if iter_page else '...' for iter_page in products.iter_pages()],
            items=[product for product in products.items]
        )
    
    def get_all_parents_paginate(self,page: int, per_page: int, name:str|None = None, category_id: int|None = None, stock_amount:int|None = None, stock_details:str|None = "fazla") -> ProductPaginate:
        where = [Product.parent_id == None]
        products = self.db_session.query(Product)
        
        if name is not None:
            where.append(Product.name.like("%{}%".format(name)))
            
        if category_id is not None:
            where.append(Product.category_id == category_id)
            
        if stock_amount is not None and stock_amount > 0:
            if stock_details == "fazla":
                where.append(Product.stock_amount >= stock_amount)
            if stock_details == "az":
                where.append(Product.stock_amount <= stock_amount)
        
        products = products.where(*where).order_by(Product.id.desc()).paginate(page=page, per_page=per_page)
        
        return ProductPaginate(
            page=page,
            per_page=per_page,
            has_next=products.has_next,
            has_prev=products.has_prev,
            total= products.total,
            page_list= [iter_page if iter_page else '...' for iter_page in products.iter_pages()],
            items=[product for product in products.items]
        )
        
    def get_details(self, id: int) -> Product:
        return self.db_session.query(Product).where(Product.id == id).options(joinedload(Product.child_products)).first()
    
    def get_all_parents(self) -> List[Product]:
        return self.db_session.query(Product).where(Product.parent_id == None).order_by(Product.id.desc()).all()
    
    def update(self, product: ProductDTO) -> Product|bool:
        try:
            prod = self.find_one(product.id)
            is_stock_changed = False if prod.stock_amount == product.stock_amount else True
            
            prod.category_id = product.category_id
            prod.name = product.name
            prod.price = product.price
            prod.stock_amount = product.stock_amount
            
            
            self.db_session.execute(product_attribute_data_pivot_table.delete().where(product_attribute_data_pivot_table.c.product_id == product.id))
            self.db_session.commit()
                
            for attribute in product.attributes:
                if attribute.attribute_data_id != 0 and attribute.attribute_id != 0:
                    new_attribute_data = product_attribute_data_pivot_table.insert().values(product_id=prod.id, attribute_data_id=attribute.attribute_data_id)
                    db.session.execute(new_attribute_data)
                    
            if is_stock_changed and prod.parent_id is not None:
                self.update_stock_with_child_product(prod.parent_id)
            
            self.db_session.commit()
            return prod
        except:
            return False
    
    def create(self, product: ProductDTO) -> Product|bool:
        try:
            new_product = Product(name=product.name, parent_id=product.parent_id, sku=product.sku, category_id=product.category_id,price=product.price, stock_amount=product.stock_amount)
            db.session.add(new_product)
            db.session.commit()
            
            for attribute in product.attributes:
                new_attribute_data = product_attribute_data_pivot_table.insert().values(product_id=new_product.id, attribute_data_id=attribute.attribute_data_id)
                db.session.execute(new_attribute_data)
                
            if new_product.parent_id is not None:
                self.update_stock_with_child_product(new_product.parent_id)
                
            db.session.commit()
            return new_product
        except:
            return False
        
    def update_all_stock_with_child_products(self) -> bool:
        try:
            sub_product = aliased(Product)
            subquery = select(func.sum(sub_product.stock_amount)).where(sub_product.parent_id == Product.id)
            
            query = (
                update(Product)
                .where(Product.parent_id == None)
                .values(stock_amount=subquery.as_scalar())
            )
            
            self.db_session.execute(query)
            self.db_session.commit()
            
            return True
        except:
            return False
        
    def update_stock_with_child_product(self, id:int) -> bool:
        try:
            sub_product = aliased(Product)
            subquery = select(func.sum(sub_product.stock_amount)).where(sub_product.parent_id == Product.id)
            
            query = (
                update(Product)
                .where(Product.parent_id == None, Product.id == id)
                .values(stock_amount=subquery.as_scalar())
            )
            
            self.db_session.execute(query)
            self.db_session.commit()
            
            return True
        except Exception as e:
            return False
        
    def delete(self, id: int) -> bool:
        deleted_rows = self.db_session.query(Product).where(Product.id == id).delete()
        self.db_session.commit()
        
        if deleted_rows > 0:
            return True
        else:
            return False
            
    
product_repository = ProductRepositorySQLAlchemy(db.session)