from ...extensions import db
from ...base_class import Base
from typing import List, Optional
from ..category.models import Category
    
product_attribute_data_pivot_table = db.Table("product_attribute_data", 
                                            Base.metadata,
                                            db.Column("product_id", db.Integer, db.ForeignKey("product.id", ondelete='CASCADE')),
                                            db.Column("attribute_data_id", db.Integer, db.ForeignKey("attribute_data.id", ondelete='CASCADE')),
                                            db.UniqueConstraint('product_id', 'attribute_data_id', name='pax_1')
                                         )

class Product(Base):
    __tablename__ =  "product"
    
    id: db.Mapped[int] = db.mapped_column(db.Integer, primary_key=True)
    parent_id: db.Mapped[Optional[int]] = db.mapped_column(db.Integer, db.ForeignKey('product.id', ondelete="CASCADE"), nullable=True)
    name: db.Mapped[str] = db.mapped_column(db.String, nullable=True)
    category_id: db.Mapped[int] = db.mapped_column(db.Integer, db.ForeignKey('category.id', ondelete='SET NULL'), nullable=True)
    sku: db.Mapped[str] = db.mapped_column(db.String, unique=True)
    price: db.Mapped[Optional[float]] = db.mapped_column(db.Float, nullable=True)
    stock_amount: db.Mapped[int] = db.mapped_column(db.Integer, default=0)
    
    category: db.Mapped[Category] = db.relationship(Category, backref='products')
    attribute_datas: db.Mapped[Optional[List["AttributeData"]]] = db.relationship("AttributeData",secondary=product_attribute_data_pivot_table, backref='products')
    child_products: db.Mapped[List["Product"]] = db.relationship('Product', backref=db.backref('parent_product', remote_side=[id]))
    

        
    def get_attribute_names(self, obj):
        liste = set([])
        
        if obj.attribute_datas:
            for attribute_data in obj.attribute_datas:
                liste.add(attribute_data.attribute.name)
        
        for product in obj.child_products:
            for attribute_data in product.attribute_datas:
                liste.add(attribute_data.attribute.name)
        
        return ", ".join(list(liste))
    
    def get_price_range(self, obj):
        if obj.price is None:
            max_price = 0
            lowest_price = 9999999
            
            for child_product in obj.child_products:
                if child_product.price is not None and child_product.price > max_price:
                    max_price = child_product.price
                if child_product.price is not None and child_product.price < lowest_price:
                    lowest_price = child_product.price
            if lowest_price > 0 and lowest_price != 9999999 and max_price > 0 and lowest_price is not max_price:
                return str(lowest_price) + " ₺ - " + str(max_price) + " ₺"
            elif lowest_price > 0 and lowest_price != 9999999:
                return str(lowest_price) + " ₺"
            else:
                return str(max_price) + " ₺"
        else:
            return obj.price
    
    def to_dict(self):
        category_name = self.category.name if self.category else "-"
        product_dict =  {
            "id": self.id,
            "parent_id": self.parent_id,
            "name": self.name,
            "category_id": self.category_id,
            "category_name": category_name,
            "sku": self.sku,
            "price": self.price,
            "stock_amount": self.stock_amount,
            "attribute_data": [attribute_data.to_dict() for attribute_data in self.attribute_datas],
            "attribute_names": self.get_attribute_names(self)
        }
        
        if self.parent_id is None:
            product_dict["price_range"] = self.get_price_range(self)
            product_dict["child_products"] = [product.to_dict() for product in self.child_products]
        
        return product_dict