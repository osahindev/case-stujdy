import os

from flask import Flask
from .apps.auth.models import User, UserToken
from .apps.category.models import Category
from .apps.attribute.models import Attribute, AttributeData
from .apps.product.models import Product, product_attribute_data_pivot_table
from .base_class import Base

def create_app(test_config=None):
    app = Flask(__name__, instance_relative_config=True)
    
    @app.after_request
    def add_header(response):
        response.headers['Content-Type'] = "application/json"
        response.headers['Access-Control-Allow-Headers'] = "Content-Type, Authorization"
        response.headers['Access-Control-Allow-Methods'] = "GET, POST, DELETE, PATCH, OPTIONS"
        response.headers['Access-Control-Allow-Origin'] = "*"
        return response

    if test_config is None:
        app.config.from_object('flaskapp.config.Config')
    else:
        app.config.from_object(test_config)

    try:
        os.makedirs(app.instance_path)
    except OSError:
        pass
    
    from .extensions import db, sv
    db.init_app(app)
    sv.init_app(app)
    
    # Blueprintler
    from .apps.auth import bp as auth_bp
    app.register_blueprint(auth_bp)
    
    from .apps.attribute import bp as attribute_bp
    app.register_blueprint(attribute_bp)
    
    from .apps.category import bp as category_bp
    app.register_blueprint(category_bp)
    
    from .apps.product import bp as product_bp
    app.register_blueprint(product_bp)
    
    from .apps.imports import bp as import_bp
    app.register_blueprint(import_bp)
    
    
    with app.app_context():
        Base.metadata.create_all(bind=db.engine)
        
        user = db.session.query(User).where(User.email == "osahin@outlook.com").first()
        
        if user is None:
            import bcrypt
            password = b'123456'
            user = User(first_name="Oğuzhan", last_name="Şahin", email="osahin@outlook.com", password=bcrypt.hashpw(password, bcrypt.gensalt()))
            db.session.add(user)
            db.session.commit() 

    return app
