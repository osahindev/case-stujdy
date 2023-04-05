from flask_sieve import FormRequest

class NewProductRequest(FormRequest):
    def rules(self):
        return {
            'parent_id': ["nullable", "numeric"],
            'sku': ['required'],
            'name': ['required'],
            'category_id': ['required', 'numeric'],
            'price': ['required_with:parent_id', 'numeric'],
            'stock_amount': ['required', 'numeric', 'min:0'],
            'attributes': ['nullable', 'array'],
        }
        
    def messages(self):
        return {
            'parent_id.numeric': 'Ana ürün değeri sayı olmalıdır.',
            'sku.required': 'SKU değeri mecburidir.',
            'name.required': 'İsim mecburidir.',
            'category_id.required': 'Kategori seçmek mecburidir.',
            'category_id.numeric': 'Kategori değeri sayısal olmalıdır.',
            'price.required_with': 'Fiyat alt ürünlerde mecburidir.',
            'price.numeric': 'Fiyat değeri sayısal olmalıdır.',
            'stock_amount.required': 'Stok değeri mecburidir.',
            'stock_amount.numeric': 'Stok değeri sayısal olmalıdır.',
            'stock_amount.min': 'Stok değeri en az 0 olmalıdır.',
        }

class UpdateProductRequest(FormRequest):
    def rules(self):
        return {
            'id': ["required", "numeric"],
            'parent_id': ["nullable", "numeric"],
            'sku': ['required'],
            'name': ['required'],
            'category_id': ['required', 'numeric'],
            'price': ['required_with:parent_id', 'numeric'],
            'stock_amount': ['required', 'numeric', 'min:0'],
            'attributes': ['nullable', 'array'],
        }
        
    def messages(self):
        return {
            'id.required': 'ID değeri mecburidir.',
            'id.numeric': 'ID ürün değeri sayısal olmalıdır.',
            'parent_id.numeric': 'Ana ürün değeri sayı olmalıdır.',
            'sku.required': 'SKU değeri mecburidir.',
            'name.required': 'İsim mecburidir.',
            'category_id.required': 'Kategori seçmek mecburidir.',
            'category_id.numeric': 'Kategori değeri sayısal olmalıdır.',
            'price.required_with': 'Fiyat alt ürünlerde mecburidir.',
            'price.numeric': 'Fiyat değeri sayısal olmalıdır.',
            'stock_amount.required': 'Stok değeri mecburidir.',
            'stock_amount.numeric': 'Stok değeri sayısal olmalıdır.',
            'stock_amount.min': 'Stok değeri en az 0 olmalıdır.',
            'attributes.array': 'Özellikler dizi olmalıdır.'
        }