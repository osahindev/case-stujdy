from . import bp
from flask import jsonify, request
from ...services.CategoryService import category_service
from ..auth.utils import token_required
from flask_sieve import validate
from .validators import NewCategoryRequest, UpdateCategoryRequest

@bp.route("/", methods=["GET",])
@token_required
def all(current_user):
    categories = category_service.get_all()
    return jsonify({"data": [category.to_dict() for category in categories], "result": "OK"})

@bp.route("/create", methods=["POST",])
@token_required
@validate(NewCategoryRequest)
def create(current_user):
    json_data = request.get_json()
    
    if "name" in json_data:
        name = json_data["name"]
        
        result = category_service.create(name)
        
        if result != False:
            return jsonify({"data": result.to_dict(), "result": "OK"})
        
    return jsonify({"data": [], "result": "NOTOK"})

@bp.route("/update", methods=["PATCH",])
@token_required
@validate(UpdateCategoryRequest)
def update(current_user):
    json_data = request.get_json()
    
    if "id" in json_data and "name" in json_data:
        id = json_data["id"]
        name = json_data["name"]
        
        category = category_service.update(id, name)
        
        if category != False:
            return jsonify({"data": category.to_dict(), "result": "OK"})

    return jsonify({"data": [], "result": "NOTOK"})

@bp.route("/delete", methods=["DELETE",])
@token_required
def delete(current_user):
    json_data = request.get_json()
    
    if "id" in json_data:
        id = json_data["id"]
        
        result = category_service.destroy(id)
        
        if result != False:
            return jsonify({"data": result, "result": "OK"})

    return jsonify({"data": [], "result": "NOTOK"})