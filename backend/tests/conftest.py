from flaskapp import create_app
from flaskapp.extensions import db
import os

import pytest

@pytest.fixture()
def app():
    from flaskapp.config import TestConfig
    app = create_app(TestConfig)
    
    with app.app_context():
        from flaskapp.apps.attribute.models import Attribute, AttributeData
        from flaskapp.apps.auth.models import User, UserToken
        from flaskapp.apps.category.models import Category
        from flaskapp.apps.product.models import Product
        from flaskapp.base_class import Base
        
        Base.metadata.create_all(bind=db.engine)
        
    yield app
    
    if os.path.exists(os.path.join(app.instance_path, "test.db")):
        os.remove(os.path.join(app.instance_path, "test.db"))
    
@pytest.fixture()
def client(app):
    return app.test_client()

    
@pytest.fixture()
def runner(app):
    return app.test_cli_runner()