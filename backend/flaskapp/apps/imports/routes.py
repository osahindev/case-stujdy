from . import bp
from flask import request, jsonify, current_app
from flask_sieve import validate
from .validators import UploadFileRequest
from ...services.ExcelImportService import excel_service
from ..auth.utils import token_required

@bp.route('/upload', methods=["POST"])
@token_required
@validate(UploadFileRequest)
def upload(current_user):
    files = request.files
    
    if "file" in files:
        file = files["file"]
        
        mime_type = file.content_type

        if mime_type == "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":
            service = excel_service.open_file(file).get_db_data().get_fields().start_import_process()
            
            stats = service.get_stats()
            service.close()
            
            return jsonify({"data": {"inserted_product_count": stats["imported"], "was_inserted_product_count": stats["exists"]}, "result": "OK"})
        else:
            return jsonify({
                    "errors": {
                        "file": [
                            "Yalnızca XLSX formatında excel dosyalarını destekliyor."
                        ]
                    },
                    "message": "Validation error",
                    "success": False
                }), 400
    
    return jsonify({"data": [], "result": "NOTOK"})