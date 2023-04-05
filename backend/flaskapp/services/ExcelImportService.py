import openpyxl
from ..services.CategoryService import category_service
from ..services.ProductService import product_service
from ..apps.product.dto import Product, Attribute
from ..services.AttributeDataService import attribute_data_service
from ..services.AttributeService import attribute_service

class ExcelImportService:
    workbook: openpyxl.Workbook|None = None
    categories = {}
    attributes = {}
    stats = {
        "imported": 0,
        "exists" : 0
    }
    fields = {"columns": {}, "attributes": {}}
    
    def open_file(self, file):
        ''' Excel dosyasını açar. '''
        self.workbook = openpyxl.load_workbook(file, read_only=True)
        
        return self
    
    def get_stats(self):
        ''' İstatistik verilerinin döndürür. '''
        return self.stats
    
    def start_import_process(self):
        ''' Ürün verilerinin içe aktarım işlemini başlatır. '''
        last_main_product = None
        
        for row in self.workbook.active.iter_rows(min_row=2, values_only=True):
            is_main = self.is_main_row(row)
            
            category = self.get_column_value(row, "CATEGORY")
            
            if is_main is False and last_main_product is not None:
                category = last_main_product.category.name
            
            if category:
                category_id = self.find_category(category)
            else:
                category_id = None
            
            sku = self.get_column_value(row, "SKU")
            
            if not sku:
                raise Exception("SKU alanı olmak zorundadır.")
            
            product = product_service.get_with_sku(sku)
            
            if product is None:
                attributes = []
                
                for attribute_name in self.fields["attributes"].keys():
                    attribute_data = self.get_column_value(row, attribute_name)
                    
                    attribute_id = self.find_attribute(attribute_name)
                    
                    if attribute_data:
                        attribute_data_id = self.find_attribute_data(attribute_name, attribute_data)
                        attributes.append(Attribute(attribute_data_id=attribute_data_id, attribute_id=attribute_id))
                    
                
                product_data = Product(
                        parent_id = last_main_product.id if last_main_product is not None and is_main is False else None,
                        name = self.get_column_value(row, "NAME"), 
                        sku = self.get_column_value(row, "SKU"),
                        category_id = category_id,
                        stock_amount = self.get_column_value(row, "STOCK_AMOUNT"),
                        price = self.get_column_value(row, "PRICE"),
                        attributes=attributes
                    )
                
                product = product_service.create(product_data)
                
                self.stats["imported"] = self.stats["imported"] + 1
            else:
                self.stats["exists"] = self.stats["exists"] + 1
                
            if is_main:
                last_main_product = product
        
        product_service.update_all_stock_with_child_products()
        
        return self
    
    def get_column_value(self, row, fieldName: str):
        ''' İlk satırdan belirlenen kolonların yerlerine göre aktif satırdan veriyi getirir. '''
        if fieldName in self.fields["columns"]:
            return row[int(self.fields["columns"].get(fieldName))]
        
        if fieldName in self.fields["attributes"]:
            return row[int(self.fields["attributes"].get(fieldName))]
        
        raise Exception(f"{fieldName} isim veri bulunamadı.")
    
    def is_main_row(self, row):
        ''' Aktif satırın ana ürün olup olmadığını kontrol eder '''
        return True if self.get_column_value(row, "ID") == "-" else False
    
    def get_fields(self):
        ''' İlk satırda verilerin nerede olduğunun bilgisinin tespiti '''
        for index, cell in enumerate(self.workbook.active[1], start=0):
            if cell.value:
                if cell.value.find("ATTRIBUTE") == -1:
                    self.fields["columns"][cell.value.replace("#","")] = index
                else:
                    self.fields["attributes"][cell.value.replace("#","").replace("ATTRIBUTE/", "")] = index
                    self.find_attribute(cell.value.replace("#","").replace("ATTRIBUTE/", ""))
        
        return self
    
    def get_db_data(self):
        ''' Veritabanında var olan kategori ve varyasyon ( nitelik ) verilerini alır. '''
        categories = category_service.get_all()
        
        for category in categories:
            self.categories[category.name] = category.id
            
        attributes = attribute_service.get_all_with_data()
        
        for attribute in attributes:
            d = {
                "id": attribute.id,
                "data": {}
            }
            
            for data in attribute.data:
                d["data"][data.value] = data.id
            
            self.attributes[attribute.name] = d
        
        return self
    
    def find_attribute_data(self, attribute_name: str, attribute_data: str):
        ''' Veritabanından çektiğimiz listede varyasyonun ( nitelik ) verisi olup olmadığını kontrol eder, yoksa oluşturur ve ID değerini döndürür. '''
        if attribute_name in self.attributes:
            data = self.attributes[attribute_name]["data"]
            
            if attribute_data in data:
                return data[attribute_data]
            else:
                attribute_data = attribute_data_service.create(self.attributes[attribute_name].get("id"), attribute_data)
                self.attributes[attribute_name]["data"][attribute_data.value] = attribute_data.id
                
                return attribute_data.id
            
        raise Exception("Varyasyon değeri bulunamadı.")
    
    def find_attribute(self, name: str):
        ''' Veritabanından çektiğimiz listede varyasyonun ( nitelik ) olup olmadığını kontrol eder, yoksa oluşturur ve ID değerini döndürür. '''
        if name in self.attributes:
            return self.attributes[name]["id"]
        
        attribute = attribute_service.create(name)
        
        if attribute != False:
            self.attributes[attribute.name] = {
                "id": attribute.id,
                "data": {}
            }
            return attribute.id
            
        raise Exception("Nitelik bulunamadı.")
    
    def find_category(self, name: str):
        ''' Veritabanından çektiğimiz listede kategorinin olup olmadığını kontrol eder, yoksa oluşturur ve ID değerini döndürür. '''
        if name in self.categories:
            return int(self.categories[name])
        
        category = category_service.create(name)
        
        if category != False:
            self.categories[category.name] = category.id
            return category.id
        
        raise Exception("Kategori bulunamadı")
        
    def close(self):
        ''' Açık olan dosyayı kapatır. '''
        self.workbook.close()
        
        
excel_service = ExcelImportService()