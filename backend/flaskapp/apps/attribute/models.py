from ...extensions import db
from ...base_class import Base

class Attribute(Base):
    __tablename__ = "attribute"
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50))
    data = db.relationship("AttributeData", backref='attribute', lazy="joined")
    
    def __repr__(self) -> str:
        return f"<Attribute id={self.id} name={self.name}>"
    
    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
        }
        
    def to_dict_with_data(self):
        return {
            "id": self.id,
            "name": self.name,
            "data": [data.to_dict() for data in self.data]
        }

class AttributeData(Base):
    __tablename__ = "attribute_data"
    
    id = db.Column(db.Integer, primary_key=True)
    attribute_id = db.Column(db.Integer,db.ForeignKey(Attribute.id))
    value = db.Column(db.Text())
    
    def to_dict(self):
        return {
            "id": self.id,
            "attribute_id": self.attribute_id,
            "value": self.value
        }