from ...base_class import Base
from ...extensions import db

class Category(Base):
    __tablename__ = "category"
    
    id: db.Mapped[int]  = db.mapped_column(db.Integer, primary_key=True)
    name: db.Mapped[str]  = db.mapped_column(db.String(50))
    
    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name
        }