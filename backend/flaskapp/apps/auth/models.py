from ...extensions import db
from datetime import datetime
from ...base_class import Base

class User(Base):
    __tablename__ = "user"
    
    id: db.Mapped[int] = db.mapped_column(db.Integer, primary_key=True)
    first_name: db.Mapped[str] = db.mapped_column(db.String(100), nullable=True)
    last_name: db.Mapped[str] = db.mapped_column(db.String(100), nullable=True)
    email: db.Mapped[str] = db.mapped_column(db.String(120), unique=True, nullable=False)
    password: db.Mapped[str] = db.mapped_column(db.String(200))
    created_at = db.mapped_column(db.DateTime, default=datetime.utcnow())
    
class UserToken(Base):
    __tablename__ = "user_token"
    
    user_id: db.Mapped[int] = db.mapped_column(db.ForeignKey(User.id, ondelete="CASCADE"), primary_key=True)
    token: db.Mapped[str] = db.mapped_column(db.Text(), nullable=False)
    last_date = db.mapped_column(db.DateTime, nullable=True)