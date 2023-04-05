class Config:
    SECRET_KEY='dev'
    SQLALCHEMY_DATABASE_URI= "sqlite:///project.db"
    
    
class TestConfig:
    TESTING=True
    SECRET_KEY='dev'
    SQLALCHEMY_DATABASE_URI= "sqlite:///test.db"