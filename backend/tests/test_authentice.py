import json

def test_user_login_successfull(client):
    response = client.post("/api/auth/login", data=json.dumps({"email": "osahin@outlook.com", "password": "123456"}), content_type='application/json')
    
    data = json.loads(response.get_data(as_text=True))
    
    assert response.status_code == 200
    assert "data" in data
    assert "result" in data
    assert data["result"] == "OK"
    
def test_user_login_unsuccessfull(client):
    response = client.post("/api/auth/login", data=json.dumps({"email": "osahin@outlook.com", "password": "xxx"}), content_type='application/json')
    
    data = json.loads(response.get_data(as_text=True))
    
    assert response.status_code == 200
    assert "data" in data
    assert "message" in data["data"]
    assert data["data"]["message"] == "Kullanıcı bulunamadı."
    assert "result" in data
    assert data["result"] == "NOTOK"