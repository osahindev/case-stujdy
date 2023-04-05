from flask_sieve import FormRequest

class NewAttributeRequest(FormRequest):
    def rules(self):
        return {
            'name': ['required'],
        }
        
    def messages(self):
        return {
            'name.required': 'Varyasyon ismi zorunludur.',
        }
        
class NewAttributeDataRequest(FormRequest):
    def rules(self):
        return {
            'attribute_id': ['required', 'numeric'],
            'value': ['required'],
        }
        
    def messages(self):
        return {
            'attribute_id.required': 'Özellik ID değeri zorunludur.',
            'attribute_id.numeric': 'Özellik ID değeri sayısal olmalıdır.',
            'value.required': 'Varyasyon verisi zorunludur.',
        }
        
class UpdateAttributeRequest(FormRequest):
    def rules(self):
        return {
            'id': ['required', 'numeric'],
            'name': ['required'],
        }
        
    def messages(self):
        return {
            'id.required': 'ID değeri zorunludur.',
            'id.numeric': 'ID değeri sayısal olmalıdır.',
            'name.required': 'Varyasyon ismi zorunludur.',
        }
        
class UpdateAttributeDataRequest(FormRequest):
    def rules(self):
        return {
            'id': ['required', 'numeric'],
            'value': ['required'],
        }
        
    def messages(self):
        return {
            'id.required': 'ID değeri zorunludur.',
            'id.numeric': 'ID değeri sayısal olmalıdır.',
            'value.required': 'Varyasyon verisi zorunludur.',
        }