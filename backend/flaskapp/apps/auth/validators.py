from flask_sieve import FormRequest

class LoginRequest(FormRequest):
    def rules(self):
        return {
            "email": ["required", "email"],
            "password": ["required"]
        }
        
    def messages(self):
        return {
            'email.required': 'E-Posta zorunludur.',
            'email.email': 'Geçerli bir e-posta giriniz..',
            'password.required': 'Şifre zorunludur.'
        }