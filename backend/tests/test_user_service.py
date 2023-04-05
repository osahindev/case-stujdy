from flaskapp.services.UserService import user_service
import json

def test_user_failed_login_with_service(app):
    with app.app_context():
        user = user_service.login("osahin@outlook.com", "xxx")
        
        assert user == False

def test_user_login_with_service(app):
    with app.app_context():
        user = user_service.login("osahin@outlook.com", "123456")
        
        assert user != False
        assert user.token is not None

def test_get_generated_token_not_fount(app):
    with app.app_context():
        token_data = user_service.find_token("xxxx")
        
        assert token_data is None

def test_login_generated_token(client, app):
    response = client.post("/api/auth/login", data=json.dumps({"email": "osahin@outlook.com", "password": "123456"}), content_type='application/json')
    
    data = json.loads(response.get_data(as_text=True))
    
    assert "data" in data
    assert "token" in data["data"]
    assert "result" in data
    assert data["result"] == "OK"
    
    with app.app_context():
        token_data = user_service.find_token(data["data"]["token"])
        
        assert token_data is not None
        assert token_data.token == data["data"]["token"]
        
def test_get_by_id_successfull(app):
    with app.app_context():
        user = user_service.find_one(1)
        
        assert user is not None
        assert user.id == 1

def test_get_by_email_successfull(app):
    with app.app_context():
        user = user_service.find_with_email('osahin@outlook.com')
    
        assert user.email == "osahin@outlook.com"
        
def test_get_by_email_unsuccessfull(app):
    with app.app_context():
        user = user_service.find_with_email("x@x.com")
        
        assert user is None