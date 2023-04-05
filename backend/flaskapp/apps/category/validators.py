from flask_sieve import FormRequest

class NewCategoryRequest(FormRequest):
    def rules(self):
        return {
            'name': ['required'],
        }
        
    def messages(self):
        return {
            'name.required': 'Kategori ismi zorunludur.',
        }

class UpdateCategoryRequest(FormRequest):
    def rules(self):
        return {
            'id': ['required', 'numeric'],
            'name': ['required'],
        }
        
    def messages(self):
        return {
            'name.required': 'Kategori ismi zorunludur.',
            'id.required': 'ID değeri zorunludur.',
            'id.numeric': 'ID sayı olmalıdır.',
        }